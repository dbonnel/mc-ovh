<?php
namespace Views {
    class HtmlView extends View
    {
        
        public function show($template)
        {

            // Ajout d'une variable contenant toutes les variables pour faciliter le déboguage
            // $this->set_var('vars', $this->get_all_vars());

            $GLOBALS['tpl_vars'] = $this->get_all_vars();

           // print_r($GLOBALS['tpl_vars']); exit;

            dbg('template', $template);

            dbg('tpl_vars', $GLOBALS['tpl_vars']);

            // Include the template file
            include dirname(__DIR__) . '/templates/' . $template . '.tpl.php';

        }

        public function show_msg($title, $msg, $page = '/')
        {
            \App\Session::write('msg_popup', ['title' => $title, 'msg' => $msg]);
            $this->redirect($page);
        }

        public function redirect($path)
        {
            header('Location: ' . \App\Config::$base_url . $path);
            exit();
        }
    }
}
