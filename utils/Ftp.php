<?php
namespace Utils {
    class Ftp
    {
        public static function upload($filenames, $mode = FTP_BINARY)
        {
            $connexion_id = ftp_connect(\App\Config::$ftp_server);
            $login_result = ftp_login($connexion_id, \App\Config::$ftp_id, \App\Config::$ftp_pw);
            ftp_pasv($connexion_id, true);
            if (!is_array($filenames)) {
                $filenames = [$filenames];
            }
            foreach ($filenames as $filename) {
                $remote = \App\Config::$ftp_path . '/' . $filename;
                $result = ftp_put($connexion_id, $remote, $filename, $mode); //TODO: Erreur gestion
            }
            ftp_close($connexion_id);
            return $result;
        }

        public static function download($filenames, $mode = FTP_BINARY)
        {
            $connexion_id = ftp_connect(\App\Config::$ftp_server);
            $login_result = ftp_login($connexion_id, \App\Config::$ftp_id, \App\Config::$ftp_pw);
            ftp_pasv($connexion_id, true);
            if (!is_array($filenames)) {
                $filenames = [$filenames];
            }
            foreach ($filenames as $filename) {
                $remote = \App\Config::$ftp_path . '/' . $filename;
                $result = ftp_get($connexion_id, $filename, $remote,  $mode); //TODO: Erreur gestion
            }
            ftp_close($connexion_id);
            return $result;
        }

        public static function upload_object(string $name, array $array)
        {
         //   $filename = 'temp/tmp_' . \Utils\Tools::base64url_encode($name).'.txt';
         $filename = 'temp/' . $name.'.txt';
            file_put_contents(\App\Config::$base_dir . '/' . $filename, json_encode($array));
            return static::upload($filename);
        }

        public static function get_uploaded_object(string $name) 
        {
           // $filename = 'temp/tmp_' . \Utils\Tools::base64url_encode($name).'.txt';
            $filename = 'temp/' . $name.'.txt';
            return json_decode(file_get_contents(\App\Config::$base_dir . '/' . $filename), true);          
        }
    }
}
