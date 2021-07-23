<?php

/**
 * Fichier app\Config.php
 *
 * Données de cohfiguration de l'application
 * (Base de données, FTP...)
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
     * SystemController
     *
     * Contrôleur Système
     *
     * @version   Release: 1.0.0
     * @since     1.0.0
     */
    class SystemController extends Controller
    {

        public function batchJs()
        {
            $this->model = new \Models\PostModel();
            $sql = (new \Utils\SqlRequest('SELECT'))->set_fields(['id'])->add_order(['menu_order'])->request();
            $content = $this->model->select_many($sql);
            $content = json_encode($content);
            $this->view->set_var('content', '<a id="batch">Batch</a>');
            $this->view->set_var('top_footer', "<script>\npost_ids = '$content';\n</script>");
            $this->view->set_var('page_title', 'Batch');
            $this->view->show('main');
        }

        public function dbBackup()
        {
            try {
                $dump = new \Utils\Mysqldump('mysql:host=' . \App\Config::$db_host . ';dbname=' . \App\Config::$db_name, \App\Config::$db_username, \App\Config::$db_password);
                $dump->start(dirname(__DIR__) . '/db-save/backup.sql');
                $this->view->set_var('content', 'Backup OK : ' . dirname(__DIR__) . '/db-save/backup.sql');
            } catch (\Exception $e) {
                $this->view->set_var('content', 'mysqldump-php error: ' . $e->getMessage());
            }
            $this->view->set_var('page_title', 'Backup');
            $this->view->show('main');
        }

        public function dbRestore()
        {
            try {
                $dump = new \Utils\Mysqldump('mysql:host=' . \App\Config::$db_host . ';dbname=' . \App\Config::$db_name, \App\Config::$db_username, \App\Config::$db_password);
                $dump->restore(dirname(__DIR__) . '/db-save/backup.sql');
                $this->view->set_var('content', 'Restore OK : ' . dirname(__DIR__) . '/db-save/backup.sql');
            } catch (\Exception $e) {
                $this->view->set_var('content', 'mysqldump-php error: ' . $e->getMessage());
            }
            $this->view->set_var('page_title', 'Restore');
            $this->view->show('main');
        }

        public function ftpUpload($filename)
        {
            try {
                \Utils\Ftp::upload($filename);
            } catch (\Exception $e) {
                echo 'transfert error: ' . $e->getMessage();
            }
        }
        
        public function ftpDownload($filename)
        {
            try {
                \Utils\Ftp::download($filename);
            } catch (\Exception $e) {
                echo 'transfert error: ' . $e->getMessage();
            }
        }

        public function getFileList()
        {
            $dir = \App\Config::$base_dir;
            $exclude = [
                $dir . "/sess_dir_b911bt98670df",
                $dir . "/node_modules",
                $dir . "/assets/psimg",
                $dir . "/doc",
                $dir . "/phpseclib",
            ];
            return (\Utils\Tools::file_date(\Utils\Tools::scan_dir($dir, $exclude)));
            // echo 'Liste créée';
        }

        public function ftpTransfert()
        {
            $diff_files = $this->ftpDiff();
            foreach ($diff_files as $filename) {
                $this->ftpUpload($filename);
                echo $filename . '<br>';
            }
        }

        public function ftpDiff()
        {
            $file_array = $this->getFileList();
            $this->ftpDownload(\App\Config::$file_list);
            $file_prod_array = file(\App\Config::$file_list, FILE_IGNORE_NEW_LINES);
            file_put_contents(\App\Config::$file_list, implode("\n", $file_array));
            $changes = array_diff($file_array, $file_prod_array);
            $result = [];
            foreach ($changes as $change) {
                $splits = explode('|', $change);
                $result[] = $splits[0];
            }
            return $result;
        }

        public function getDebug()
        {
            $dbg_file = $_SERVER['DOCUMENT_ROOT'] . '/temp/debug.txt';
            $this->view->set_var('debug', file_get_contents($dbg_file));
            $this->view->show('pages-back/debug');
        }

        public function autolog()
        {
            setcookie('pp-id', $_GET['key'], time() + 3600 * 24 * 365, '/', null, false, true);
            header('Location: /admin/posts/list');
        }
    }
}
