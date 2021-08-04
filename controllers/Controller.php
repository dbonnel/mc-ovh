<?php
namespace Controllers {

    class Controller
    {
        public $view;
        public $admin_page = false;
        public $model;
        public $user = false;
        public $singular_name = "post";
        public $plural_name = "posts";
        public $per_page = 20;
        private $table_header = ['id'];

        public function __construct()
        {
            $this->admin_page = strpos($_SERVER['REQUEST_URI'], '/admin/') !== false;
            $this->user = \App\Session::read('user');
            $this->view = new \Views\HtmlView;
            $this->view->set_var('title', 'Cours et exercices pour le collège et le lycée - Maths-cours.fr')
                ->set_var('current_url', $_SERVER['REQUEST_URI'])
                ->set_var('dev', \App\Config::$is_dev)
                ->set_var('admin_page', $this->admin_page)
                ->set_var('top_note', \App\Session::read('top_note'))
                ->set_var('msg_popup', \App\Session::read('msg_popup'))
                ->set_var('top_footer', '')
                ->set_var('aside', \App\Config::$is_backend ? '' : 'components/aside-std')
                ->add_array_var('jsfile', ['frontend.js?z=' . time()])
                ->set_var('jsloadmodule', []);
            if ($this->user) {
                $this->view->set_var('user', $this->user)
                    ->set_var('text_login', 'Votre compte')
                    ->set_var('link_login', '/member/profile');
            }
            if ($this->admin_page) {
                $this->view->add_array_var('jsfile', ['backend.js?z=' . time(), 'katex.min.js']);
            }
            \App\Session::delete('top_note');
            \App\Session::delete('msg_popup');
            dbg('user', 'user', \App\Session::read('user'));
        }

        public function upload_by_id($params)
        {
            $id = $params[0];
            $result = $this->model->select_by_id($id);
            \Utils\Ftp::upload_object($this->singular_name . '-' . $id, $result);
            header('Location: ' . \App\Config::$prod_base_url . '/admin/posts/get-uploaded-by-id/' . $id);
        }

        public function get_uploaded_by_id($params)
        {
            $id = $params[0];
            $data = \Utils\Ftp::get_uploaded_object($this->singular_name . '-' . $id);
            $this->model->replace($data);
            $this->view->show_msg('Transfert', 'Transfert effectué avec succès.', '/admin/update-' . $this->singular_name . '/' . $id);
        }

        public function upload_by_slug($params)
        {
            $slug = $params[0];
            $result = $this->model->select_by_slug($slug);
            \Utils\Ftp::upload_object($singular_name . '-' . $slug, $result);
        }

        public function select_post_fields($data, $filter)
        {
            $result = [];
            foreach ($filter as $key) {
                if (array_key_exists($key, $data)) {
                    $result[$key] = $data[$key];
                }
            }
            return $result;
        }

        public function get_table_header()
        {
            return $this->table_header;
        }

        public function set_table_header($headers)
        {
            $this->table_header = $headers;
        }

    }
}
