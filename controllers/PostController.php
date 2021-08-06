<?php

/**
 * Fichier app\PostControllers.php
 *
 * Contrôleur des Posts de l'application
 *
 * PHP version 7
 *
 * @package   MathsCours
 * @author    Didier Bonnel <dbonnel@gmail.com>
 * @copyright 2020 Didier Bonnel
 * @version   1.0.0
 * @since     1.0.0
 */

namespace Controllers {

    /**
     * PostController
     *
     * Contrôleur des Posts de l'application
     *
     * @version   Release: 1.0.0
     * @since     1.0.0
     */
    class PostController extends Controller
    {
        public function __construct()
        {
            parent::__construct();
            $this->set_table_header([
                'N°' => 'menu_order',
                'Titre' => 'title',
                'Catégorie' => 'category',
                'Classe' => 'classe',
            ]);
            $this->model = new \Models\PostModel();
        }

        public function home($params='')
        {
            $post = $this->model->select_by_slug('home');
             if (is_null($post) || $post['category'] != 'page') {
                 throw new \App\NotFoundException('Post non trouvé');
            }
            if (\App\Session::is_administrator()) {
                $this->view->set_var('actions-menu', $this->getActions($post, ['show', 'edit', 'modify']));
            }
            $this->view->set_var('content', $post['content'])
                ->set_var('page_title', $post['title'])
                ->set_var('title', $post['title'].' - Maths-cours.fr')
                ->show('main');
        }

        public function showExercices($params)
        {
            $this->showPost($params, 'exercices');
        }

        public function showCours($params)
        {
            $this->showPost($params, 'cours');
        }
        public function showPages($params)
        {
            $this->showPost($params, 'page');
        }
        public function showMethode($params)
        {
            $this->showPost($params, 'methode');
        }

        public function showEnigme($params)
        {
            $this->showPost($params, 'enigme');
        }

        public function showQcm($params)
        {
            $this->showPost($params, 'qcm');
        }

        public function showSupplement($params)
        {
            $this->showPost($params, 'supplement');
        }

        public function showPost($params, $category)
        {
            $slug = $params[0];
            $post = $this->model->select_by_slug($slug);
            if (is_null($post) || $post['category'] != $category) {
                throw new \App\NotFoundException('Post non trouvé');
            }
            if (\App\Session::is_administrator()) {
                $this->view->set_var('actions-menu', $this->getActions($post, ['show', 'edit', 'modify']));
            }
            $sommaire = $this->model->getSommaire($post['classe'], $post['chapitre']);
            if ($post['annale_classe'] != 'no-annale') {
                $sommaire_annale = $this->model->getSommaireAnnales($post['annale_classe'], $post['annale_annee'], $post['annale_lieu']);
            } else {
                $sommaire_annale = false;
            }
            if ($post['category'] == 'qcm') {
                $content = $this->model->qcmData($post);
            } else {
                $content = $post['content'];
            }
            dbg('sommaire', $post['annale_classe'] . $post['annale_annee'] . $post['annale_lieu']);
            $this->view->set_var('page_title', $post['title'])
                ->set_var('title', $post['title'].' - Maths-cours.fr')
                ->set_var('content', $content)
                ->set_var('sommaire_annale', $sommaire_annale)
                ->set_var('sommaire', $sommaire)
                ->set_var('type_sommaire', 'fiche')
                ->set_var('content_tpl', 'components/fiche')
                ->show('main');
        }

        public function read($params)
        {
            $id = intval($params[0]);
            $post = $this->model->select_by_id($id);
            $this->view->set_var('page_title', 'Post : ' . $post['title'])
                ->set_var('post', $post)
                ->set_var('actions-menu', $this->getActions($post, ['show', 'edit', 'modify']))
                ->set_var('content_tpl', 'pages-back/admin-read-post')
                ->show('main');
        }

        public function editPost($params = [])
        {
            //TODO: if(validToken($_POST['token'])){
            //    print_r($_POST);exit;
            $id = intval($params[0] ?? 0);
            if ($id) {
                $this->view->set_var('id', $id);
                $data = $this->model->select_by_id($id, 'all');
                $page_title = 'Modifier un post';
                $post_fields = ['id', 'title', 'category', 'content', 'slug', 'classe', 'chapitre', 'menu_order', 'annale_classe', 'annale_order', 'annale_annee', 'annale_lieu', 'status'];
            } else {
                $data = [];
                $page_title = 'Créer un post';
                $post_fields = ['title', 'category', 'content', 'slug', 'classe', 'chapitre', 'menu_order', 'annale_classe', 'annale_order', 'annale_annee', 'annale_lieu', 'status'];
            }
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//  $data = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
                $data = $this->addCalculatedFields($_POST);
                $this->validatePostInput($data);
                if (empty(\Utils\Validator::get_errors())) {
                    date_default_timezone_set('Europe/Paris');
                    $data['created_at'] = date("Y-m-d H:i:s");
                    if ($id) {
                        $this->model->update_by_id($id, $data);
                    } else {
                        $id = $this->model->insert($data);
                    }
                    $this->view->redirect('/admin/update-post/' . $id);
                    exit;
                }
            }
            $this->setVarTaxonomiesOptions();
            $this->view->set_var('fields_values', $data)
                ->set_var('fields_errors', \Utils\Validator::get_errors())
                ->set_var('page_title', $page_title)
                ->set_var('jsloadmodule', ['edit'])
                ->set_var('actions-menu', $this->getActions($data, ['show', 'edit', 'modify']))
                ->set_var('content_tpl', 'pages-back/admin-edit-post')
                ->show('main');
        }

        public function delete($params)
        {
            $id = intval($params[0]);
            $result = $this->model->delete_by_id($id);
// \App\Session::write('top_note', 'Supprimé !');
            $this->view->show_msg("Enregistrement supprimé", "L'enregistrement a été supprimé avec succès !", '/admin/posts/list');
        }

        public function restore($params)
        {
            $id = intval($params[0]);
            $result = $this->model->restore_by_id(intval($id));
// \App\Session::write('top_note', 'Restauré !');
            $this->view->show_msg("Enregistrement restauré", "L'enregistrement a été restauré avec succès !", '/admin/posts/list');
        }

        public function sommaire($params)
        {
            $classe = $params[0];
            $sommaire = $this->model->getSommaire($classe);
            if (count($sommaire) == 0) {
                throw new \App\NotFoundException('Sommaire vide');
            } else {
                $this->view->set_var('sommaire', $sommaire)
                    ->set_var('page_title', "Cours et exercices de " . $classe)
                    ->set_var('title', "Cours et exercices de " . $classe . ' - Maths-cours.fr')
                    ->set_var('type_sommaire', 'global')
                    ->set_var('content_tpl', 'pages-front/sommaire')
                    ->show('main');
            }

        }

        public function annales($params)
        {
            $annale = $params[0];
            $annee = (array_key_exists(1, $params)) ? $params[1] : false;
            $sommaire_annale = $this->model->getSommaireAnnales($annale, $annee);
            if (count($sommaire_annale) == 0 && $annee === false) {
                throw new \App\NotFoundException('Annales vide');
            } else {
                $this->view->set_var('sommaire_annale', $sommaire_annale)
                    ->set_var('page_title', "Annales " . $annale)
                    ->set_var('title', "Annales " . $annale . ' - Maths-cours.fr')
                    ->set_var('type_sommaire', 'global')
                    ->set_var('content_tpl', 'pages-front/sommaire-annales')
                    ->show('main');
            }
        }

        public function ajaxGetPost($params)
        {
            echo ($params[0]); //TODO:
        }

        public function ajaxFileRW()
        {
            $action = isset($_POST['action']) ? $_POST['action'] : "";
            $filename = isset($_POST['filename']) ? $_POST['filename'] : "";
            $content = isset($_POST['content']) ? $_POST['content'] : "";
            if ($action == "read") {
                echo file_get_contents($filename);
            } elseif ($action == "write") {
                file_put_contents($filename, $content);
                //                echo 'write '.$filename;
            }
        }

        public function ajaxGetPsimg()
        {
            $input = $_POST['input'];
            $metas = json_decode($_POST['metas'], true);
            $input = str_replace("\\begin{extern}", "\\end{extern}", $input);
            $blocs_extern = explode("\\end{extern}", $input);
            $result = [];
            foreach ($blocs_extern as $i => $item) {
                if ($i % 2 == 1) {
                    $result[] = $this->createPsimg($item, $metas);
                }
            };
            echo implode('|', $result);
        }

        public function createPsimg($src, $metas)
        {
            $lines = explode("\n", $src);
            $html_infos = trim(array_shift($lines), "% \t");
            $content = implode("\n", $lines);
            $code = substr(md5(preg_replace('/\s+/', ' ', $content)), 0, 8);
            $basename = \App\Config::$base_dir . '/assets/psimg/ps-' . str_replace('/', '_', trim($metas['url'], '/')) . '-' . $code;
            $baseurl = '/assets/psimg/ps-' . str_replace('/', '_', trim($metas['url'], '/')) . '-' . $code;
            $latex_dir = \App\Config::$base_dir . '/assets/latex/';
            if (!file_exists($basename . '.svg')) {
                //   shell_exec("C:\batchs\OpenTex.bat");
                file_put_contents($basename . '.tex', file_get_contents($latex_dir . '_header_ext.tex') . "\n" . $content . "\n" . file_get_contents($latex_dir . '_footer.tex'));
                shell_exec("latex -output-directory=" . \App\Config::$base_dir . '/assets/psimg/ ' . $basename . '.tex');
                //   echo "dvisvgm --no-fonts --output=" . $basename . '.svg --bbox=preview ' . $basename . '.dvi 2>&1';
                shell_exec("dvisvgm --no-fonts --output=" . $basename . '.svg --bbox=preview ' . $basename . '.dvi 2>&1');
            }
            return '<img src="' . $baseurl . '.svg" class="tex-svg" ' . $html_infos . '>';
        }

        public function transform($params = [])
        {
            $list_transform = ['set_source'];
            if (!in_array($params[0], $list_transform)) {
                $transforms = [];
                foreach ($list_transform as $transform) {
                    $transforms[$transform] = '/admin/transform-post/' . $transform . '/' . $params[0];
                }
                $this->view->set_var('page_title', "Transformation")
                    ->set_var('links', $transforms)
                    ->set_var('content_tpl', 'components/links-list')
                    ->show('main');
            } else {
                call_user_func(array($this, 'transform_' . $params[0]), $params[1]);
            }
        }

        public function listPosts($params = [])
        {
            $data = [];
            if (count($params) > 0) {
                for ($i = 0; $i < count($params); $i += 2) {
                    $data[$params[$i]] = $params[$i + 1];
                }
            }
            $this->setVarTaxonomiesOptions(true);
            $this->view->set_var('fields_values', $data)
                ->set_var('fields_errors', \Utils\Validator::get_errors());
            $sql = (new \Utils\SqlRequest('SELECT'))->add_order(['menu_order'])->set_where(array_keys($data))->paginate($this->per_page)->request();
            $content = $this->model->select_many($sql, $data);
            $sqlCount = (new \Utils\SqlRequest('SELECT'))->set_where(array_keys($data))->request();
            $count = $this->model->select_count($sqlCount, $data);
            $pagination = new \Utils\Pagination($this->per_page, $count);
            $this->view->set_var('table_content', $this->addActions($content))
                ->set_var('table_headers', $this->get_table_header())
                ->set_var('pagination', $pagination->page_links())
                ->set_var('page_title', 'Liste des posts')
                ->set_var('jsloadmodule', ['list'])
                ->set_var('content_tpl', 'pages-back/table-posts')
                ->show('main');
        }

        public function batch($params = [])
        {
            $srcs = file_get_contents('C:\laragon\www\newmc\assets\latex\src_posts.tex');
            $arr = explode('µ', $srcs);
//     $data = ['category' => 'exercices'];
            //     $sql = (new \Utils\SqlRequest('SELECT'))->set_where(array_keys($data))->request();
            //     $content = $this->model->select_many($sql, $data);
            //     $result='';
            //     foreach($content as $line) {
            //         $file = \App\Config::$base_dir.'/assets/latex/'.$line['category'].'_'.$line['slug'].'.tex';
            //         $result .= '<br>' . $file . ' : ' . (file_exists($file)? ' existe' : ' non');
            //         if(trim($line['source']) == '') {
            //             $result .= " - vide";
            //         } else
            //         {
            //             $result .= " - source";
            //         }
            //     }
            $res = [];
            foreach ($arr as $file) {
                preg_match("/\\\\meta\{pid\}\{([0-9]*)\}/", $file, $matches);
                if ($matches && array_key_exists(1, $matches)) {
                    $id = $matches[1];
                    $res[] = $id;
                    //   $file = preg_replace("/\\\\meta\{[^\n]*\n/", "", $file);
                    $res[] = $this->model->update_by_id($id, ['source' => trim($file)]);
                }

                //   file_get_contents('C:\laragon\www\newmc\assets\latex\src_posts.tex
            }
            $this->view->set_var('page_title', 'Liste des cours')
                ->set_var('content', print_r($res, true))
                ->set_var('content_tpl', 'components/single')
                ->show('main');
        }

        private function addCalculatedFields($data)
        {
            $data['menu_order'] = $this->model->calc_menu_order(['classe' => $data['classe'], 'difficult' => $data['difficult'], 'category' => $data['category'], 'chapitre' => $data['chapitre'], 'menu_order' => $data['menu_order']]);
            $data['annale_order'] = $this->model->calc_annale_order(['annale_classe' => $data['annale_classe'], 'annale_annee' => $data['annale_annee'], 'annale_lieu' => $data['annale_lieu'], 'annale_order' => $data['annale_order']]);
            $data['content'] = $data['html_content'];
            unset($data['html_content']);
            return $data;
        }

        private function validatePostInput($data)
        {
            dbg();
            $validate = [
                'title' => ['required' => [], 'length' => ['min' => 6]],
                'category' => ['required' => []],
                'slug' => ['required' => [], 'slug_format' => [], 'dont_exist' => ['model' => $this->model, 'db_fieldname' => 'slug']],
                'menu_order' => ['verify_menu_order' => []],
                'chapitre' => ['chapitre_in_classe' => ['classe_fieldname' => 'classe']],
            ];
            \Utils\Validator::validate($data, $validate);
        }

        private function setVarTaxonomiesOptions($addOptionAll = false)
        {
            $taxonomy_model = \Models\TaxonomyModel::getInstance();
            $taxonomies = [
                'categories' => 'categorie',
                'chapitres' => 'chapitre',
                'classes' => 'classe',
                'status' => 'status',
                'difficults' => 'difficult',
                'annales' => 'annale',
                'annale_classes' => 'annale-classe',
                'annale_annees' => 'annale-annee',
                'annale_lieux' => 'annale-lieu',
            ];
            foreach ($taxonomies as $key => $value) {
                //     $options = $taxonomy_model->get_taxonomy_field($value, 'menu_order');
                $orders = $taxonomy_model->get_taxonomy_field($value, 'menu_order');
                $names = $taxonomy_model->get_taxonomy_field($value, 'name');
                $options = [];
                foreach ($orders as $slug => $order) {
                    $options[$slug] = $order . ' - ' . $names[$slug];
                }
                if ($addOptionAll) {
                    $options['all'] = 'Tous';
                }
                dbg("always", $options);
                $this->view->set_var($key, $options);
            }
        }

        private function getActions($post, $actions = ['show', 'edit', 'read'])
        {
            dbg();

            $all_actions = [
                'show' => ['icon' => 'icon-zoom', 'href' =>  ($post['slug'] == 'home') ?'/':('/' . $post['category'] . '/' . $post['slug'])],
                'edit' => ['icon' => 'icon-pen', 'href' => '/admin/update-post' . '/' . $post['id']],
                'read' => ['icon' => 'icon-gear', 'href' => '/admin/read-post' . '/' . $post['id']],
                'modify' => ['icon' => 'icon-tools', 'href' => '/admin/transform-post/set_source/' . $post['id']],
            ];
            $result = [];
            foreach ($actions as $action) {
                $result[$action] = $all_actions[$action];
            }
            return $result;
        }

        private function addActions($content)
        {
            dbg();
            foreach ($content as $key => $line) {
                $content[$key]['actions'] = $this->getActions($line, ['show', 'edit', 'read']);
            }
            return $content;
// $this->view->set_var('table_content', $content);
            // $this->view->set_var('table_headers', $headers);
            // //$this->view->set_var('actions-menu', ['read', 'show', 'edit');
            // $this->view->set_var('popup', [
            //     'popup_id' => 'popup-confirm',
            //     'popup_title' => __t('pup_title_confirm_' . $revoke),
            //     'popup_message' => __t('pup_message_confirm_' . $revoke),
            //     'popup_buttons' => [
            //         'Annuler' => ['class' => 'popup-btn-cancel nok-btn', 'id' => 'popup-btn-cancel'],
            //         'Oui' => ['class' => 'popup-btn-accept ok-btn', 'id' => 'popup-btn-accept', 'href' => '/admin/' . $revoke . '-post'],
            //     ],
            // ]);
        }

        public function bulk($params)
        {
            //  echo "ok"; exit;
            $slug = trim($params, "/");
            $post = $this->model->count_all([], 'all');
//  print_r(post); exit;
            $this->view->set_var('page_title', 'BULK')
                ->set_var('content', $post)
                ->show('main');
        }
    }

}
