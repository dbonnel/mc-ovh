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
                $dump = new \Utils\Mysqldump('mysql:host=' . \App\Config::$db_host . ';dbname=' . \App\Config::$db_name . ';port=' . \App\Config::$db_port, \App\Config::$db_username, \App\Config::$db_password);
                $dump->start(dirname(__DIR__) . '/db-save/backup.sql.gz');
                $this->view->set_var('content', 'Backup OK : ' . dirname(__DIR__) . '/db-save/backup.sql.gz');
            } catch (\Exception $e) {
                $this->view->set_var('content', 'mysqldump-php error: ' . $e->getMessage());
            }
            //     try {
            //         $zip = new \ZipArchive();

            //         $zipFile=dirname(__DIR__) . '/db-save/backup.zip';

            //         if(file_exists($zipFile)) {
            //                 unlink ($zipFile);
            //         }
            //         if ($zip->open($zipFile, \ZIPARCHIVE::CREATE) != TRUE) {
            //                 throw new \Exception("Could not open archive");
            //         }
            //    //     $zip->open($zipFile, \ZipArchive::OVERWRITE);
            //             $zip->addFile("$zipFile", 'backup.sql');

            //         // close and save archive

            //         $zip->close();
            //     } catch (\Exception $e) {
            //         $this->view->set_var('content', 'mysqldump-php error: ' . $e->getMessage());
            //     }
            $this->view->set_var('page_title', 'Backup');
            $this->view->show('main');
        }

        public function pullProduction()
        {          
            $result = shell_exec('/homez.138/mathscoukj/bin/pull-prod.sh');
            $this->view->set_var('content', "<pre> Result :</pre><pre> $result</pre>");
            $this->view->set_var('page_title', 'Pull production');
            $this->view->show('main');
        }

        public function dbRestore()
        {
            try {
                $this->unzip(dirname(__DIR__) . '/db-save/backup.sql.gz');
                $dump = new \Utils\Mysqldump('mysql:host=' . \App\Config::$db_host . ';dbname=' . \App\Config::$db_name . ';port=' . \App\Config::$db_port, \App\Config::$db_username, \App\Config::$db_password);
                $dump->restore(dirname(__DIR__) . '/db-save/backup.sql');
                $this->view->set_var('content', 'Restore OK : ' . dirname(__DIR__) . '/db-save/backup.sql.gz');
                unlink(dirname(__DIR__) . '/db-save/backup.sql');
            } catch (\Exception $e) {
                $this->view->set_var('content', 'mysqldump-php error: ' . $e->getMessage());
            }
            $this->view->set_var('page_title', 'Restore');
            $this->view->show('main');
        }

        public function unzip($file_name)
        {

// Raising this value may increase performance
            $buffer_size = 8192; // read 8kb at a time
            $out_file_name = str_replace('.gz', '', $file_name);

// Open our files (in binary mode)
            $file = gzopen($file_name, 'rb');
            $out_file = fopen($out_file_name, 'wb');

// Keep repeating until the end of the input file
            while (!gzeof($file)) {
                // Read buffer-size bytes
                // Both fwrite and gzread and binary-safe
                fwrite($out_file, gzread($file, $buffer_size));
            }

// Files are done, close files
            fclose($out_file);
            gzclose($file);
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

        public function ftpTransfertDB()
        {
            try {
                $this->ftpUpload('db-save/backup.sql.gz');
                $this->view->set_var('content', 'Transfert effectué : ' . dirname(__DIR__) . '/db-save/backup.sql.gz');
                $this->view->set_var('page_title', 'Transfert');
            } catch (\Exception $e) {
                $this->view->set_var('content', "db-save/backup.sql.gz upload failed ! " . $e->getMessage());
            }
            $this->view->show('main');
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
