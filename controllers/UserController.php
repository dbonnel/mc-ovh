<?php
namespace Controllers {

    class UserController extends Controller
    {
        public function __construct()
        {
            parent::__construct();
            $this->set_table_header(
                [
                    'N°' => 'id',
                    'Mail' => 'email',
                    'Rôle' => 'role',
                    'Status' => 'status',
                ]);
            $this->singular_name = "membre";
            $this->plural_name = "membres";
            $this->model = new \Models\UserModel();
        }

        public function confirm_mail_address()
        {
            dbg();
            $key = $_GET['key'];
            $id = \Utils\Crypto::dechiffreSym($key);
            $data = [
                'id' => $id,
                'status' => 'active',
            ];
            $result = $this->model->update($data);
//            \App\Session::write('top_note', 'Votre compte a bien été validé !');
            $this->view->show_msg("Félicitation !", "Votre compte a bien été validé !");

        }

        public function listUsers($params = []) {
            $data = ['status' => 'active'];
            if (count($params) > 0) {
                for ($i = 0; $i < count($params); $i += 2) {
                    $data[$params[$i]] = $params[$i + 1];
                }
            }
            $sql = (new \Utils\SqlRequest('SELECT'))->add_order(['id'])->set_where(array_keys($data))->paginate($this->per_page)->request();
            $content = $this->model->select_many($sql, $data);
            $sqlCount = (new \Utils\SqlRequest('SELECT'))->set_where(array_keys($data))->request();
            $count = $this->model->select_count($sqlCount, $data);
            $pagination = new \Utils\Pagination($this->per_page, $count);
            $this->table_set_vars($this->get_table_header(), $content, $data['status']);
            $this->view->set_var('pagination', $pagination->page_links())
                ->set_var('page_title', 'Liste des membres')
                ->set_var('content_tpl', 'pages-back/table-users')
                ->show('main');
        }

        public function login_register()
        {

//     //check if token is valid
            //TODO: if(validToken($_POST['token'])){
            dbg();

            if (isset($_POST['btn-login'])) {
                $data = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
                $values = $this->select_post_fields($data, ['log-token', 'log-mail', 'log-password', 'log-remember']);
                $this->validate_log_input($values);
                if (empty(\Utils\Validator::get_errors())) {
                    $user = $this->model->select_by_email($values['log-mail']);
                    if ($values['log-remember']) {
                        \App\Session::write_crypted_cookie('pp-id', $user['id']);
                    }
                    dbg('login', $_POST);
                    \App\Session::login($user);
                    $this->view->show_msg("Bienvenue !", "Vous êtes maintenant connecté !", "/member/profile");
                }
            }
            if (isset($_POST['btn-register'])) {
                //    print_r($_POST);exit;
                $data = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
                $values = $this->select_post_fields($data, ['reg-token', 'reg-mail', 'reg-password', 'reg-confirm-password']);
                $this->validate_reg_input($values);
                if (empty(\Utils\Validator::get_errors())) {
                    $password = password_hash(trim($values['reg-password']), PASSWORD_DEFAULT);
                    date_default_timezone_set('Europe/Paris');
                    $data = [
                        'email' => $values['reg-mail'],
                        'password' => password_hash(trim($values['reg-password']), PASSWORD_DEFAULT),
                        'created_at' => date("Y-m-d H:i:s"),
                    ];
                    $id = $this->model->createUser($data);
                    $this->send_validation_mail($id);
                }
            }
            $this->view->set_var('token', \App\Session::generate_token('login-register'));
            $this->view->set_var('fields_errors', \Utils\Validator::get_errors());
            $this->view->show('pages-front/login-register');
        }

        public function delete($id)
        {
            dbg();
            $result = $this->model->delete_by_id(intval($id));
            //      \App\Session::write('top_note', 'Supprimé !');
            $this->view->show_msg("Utilisateur supprimé", "L'utilisateur a été supprimé avec succès !", '/admin/users/list');
        }

        public function restore($id)
        {
            dbg();
            $result = $this->model->restore_by_id(intval($id));
            //    \App\Session::write('top_note', 'Restauré !');
            show_msg("Utilisateur restauré", "L'utilisateur a été restauré avec succès !", '/admin/users/list');
        }

        public function profile_show()
        {
            dbg('pp-id', \App\Session::read_crypted_cookie('pp-id'));
            $this->view->set_var('page_title', 'Votre profil')
                ->set_var('content_tpl', 'pages-front/profile-show')
                ->show('main');
        }

        public function logout()
        {
            dbg();
            \App\Session::logout();
            $this->view->show_msg("Déconnexion", "Vous êtes maintenant déconnecté !");
        }

        private function validate_log_input($values)
        {
            $validate = [
                'log-token' => ['verify_token' => ['name' => 'login-register']],
                'log-mail' => ['required' => [], 'verified_mail' => ['model' => $this->model]],
                'log-password' => [
                    'required' => [],
                    'verify_login' => [
                        'mail_fieldname' => 'log-mail', 'model' => $this->model,
                    ],
                ],
            ];
            \Utils\Validator::validate($values, $validate);
        }

        /**
         * Method __validate_reg_input
         *
         * @param $values $values [explicite description]
         *
         * @return void
         */
        private function validate_reg_input($values)
        {
            $validate = [
                'reg-token' => ['verify_token' => ['name' => 'login-register']],
                'reg-mail' => ['required' => [], 'dont_exist' => ['db_fieldname' => 'email', 'model' => $this->model]],
                'reg-password' => ['required' => [], 'length' => ['min' => 8]],
                'reg-confirm-password' => ['required' => [], 'confirm_password' => ['pswd_fieldname' => 'reg-password']],
                // TODO: vérifier que accept policy est cochée
            ];
            \Utils\Validator::validate($values, $validate);
        }

        private function send_validation_mail($user_id)
        {
            $verificationCode = \Utils\Crypto::chiffreSym($user_id);
            $mail = new \Views\MailView;
            $headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            $headers .= "From:dbonnel@gmail.com";
            $subject = "Account Verification";
            $mail->set_var('validation_link', \App\Config::$base_url . "/confirm-mail?key=" . $verificationCode);
            $mail->set_var('headers', $headers);
            $mail->set_var('subject', $subject);
            $mail->set_var('send_to', 'dbonnel@gmail.com'); //TODO: temporaire
            $mail->send('mail/register-confirm');
        }

    }

}
