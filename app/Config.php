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

namespace App {

    /**
     * Config
     *
     * Données de cohfiguration de l'application
     * (Base de données, FTP...)
     *
     * @version   Release: 1.0.0
     * @since     1.0.0
     */
    class Config
    {
        public static $is_dev;
        public static $is_backend;
        public static $db_host;
        public static $db_name;
        public static $db_port;
        public static $db_username;
        public static $db_password;
        public static $base_url;
        public static $base_dir;
        public static $session_dir;
        public static $ftp_server;
        public static $ftp_id;
        public static $ftp_pw;
        public static $ftp_path;
        public static $file_list;
        public static $dev_base_url;
        public static $prod_base_url;
        public static $prod_base_dir;
        //   public static $dev_base_dir;
        //   public static $prod_base_dir;

        /**
         * Method init
         *
         * @return void
         */
        public static function init()
        {
            //  static::$dev_base_dir = "C:/laragon/www/newmc";
            //  static::$prod_base_dir = "/home/mathscoukj/mc-ovh";
            static::$base_dir = dirname(__DIR__);
            static::$session_dir = static::$base_dir . '/sess_dir_b911bt98670df';
            static::$is_dev = ($_SERVER['SERVER_NAME'] == 'newmc.test');
            static::$is_backend = substr($_SERVER['REQUEST_URI'], 0, 7) == '/admin/';
            static::$file_list = 'temp/file_list.txt';
            static::$dev_base_url = "http://newmc.test";
            static::$prod_base_url = "https://www.maths-cours.fr";
            static::$prod_base_dir = "/homez.138/mathscoukj";

            if (static::$is_dev) {
                static::$db_host = "localhost";
                static::$db_name = "newmc";
                static::$db_username = "root";
                static::$db_password = "";
                static::$db_port = "3306";
                static::$base_url = static::$dev_base_url;
                static::$ftp_server = "ftp.cluster026.hosting.ovh.net";
                static::$ftp_id = "mathscoukj";
                static::$ftp_pw = "f2T6ybtmdp";
                static::$ftp_path = "www";
            } else {
                static::$db_host = "bd837-001.privatesql";
                static::$db_name = "mathscoursdb";
                static::$db_username = "mathscoukjprive";
                static::$db_password = "s2Q6ybtmdl";
                static::$db_port = "35157";
                static::$base_url = static::$prod_base_url;
            }
        }
    }
}
