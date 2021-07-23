<?php
namespace App {
    class Session
    {
        /**
         * Method start
         *
         * @return void
         */
        public static function start()
        {
            session_save_path(\App\Config::$session_dir);
            session_set_cookie_params(0, '/', null, false, true);
            session_name('pp-session');
            session_start();
            if (!array_key_exists('user', $_SESSION) && isset($_COOKIE['pp-id'])) {
                $id = static::read_crypted_cookie('pp-id');
                $_SESSION['user'] = (new \Models\UserModel)->select_by_id($id);
            }
        }

        /**
         * Method login
         * Sauvegarde l'utilisateur dans la session après le login
         *
         * @param array $user [explicite description]
         *
         * @return void
         */
        public static function login(array $user)
        {
            if ($user) {
                session_regenerate_id(); // prevent session fixation attacks
                $_SESSION['user'] = $user;
            }
            return true;
        }

        /**
         * Method is_logged_in
         *
         * @return bool
         */
        public static function is_logged_in(): bool
        {
            return static::read('user') !== false;
        }

        /**
         * Method is_administrator
         *
         * @return bool
         */
        public static function is_administrator(): bool
        {
            return static::read('user', 'role') == 'admin';
        }

        /**
         * Method logout
         *
         * @return void
         */
        public static function logout()
        {
            dbg();
            //print_r($_SESSION['user']);
            unset($_SESSION['user']);
            static::delete_cookie('pp-id');
        }

        /**
         * Lit une valeur dans la session.
         *
         * @param  string  $key   String identifier.
         * @param  boolean $child Optional child identifier for accessing array elements.
         * @return mixed Returns a string value upon success.  Returns false upon failure.
         * @throws InvalidArgumentTypeException Session key is not a string value.
         */
        public static function read($key, $child = false)
        {
            if (!is_string($key)) {
                throw new InvalidArgumentTypeException('Session key must be string value');
            }

            if (isset($_SESSION[$key])) {
                if (false == $child) {
                    return $_SESSION[$key];
                } else {
                    if (isset($_SESSION[$key][$child])) {
                        return $_SESSION[$key][$child];
                    }
                }
            }
            return false;
        }

        /**
         * Ecrit une valeur dans la session.
         *
         * @param  string $key   String identifier.
         * @param  mixed  $value Single value or array of values to be written.
         * @return mixed Value or array of values written.
         * @throws InvalidArgumentTypeException Session key is not a string value.
         */
        public static function write($key, $value)
        {
            if (!is_string($key)) {
                throw new InvalidArgumentTypeException('Session key must be string value');
            }

            $_SESSION[$key] = $value;
            return $value;
        }

        /**
         * Lit un cookie crypté et le décrypte.
         *
         * @param  string $key String identifier.
         * @return mixed Returns a string value upon success.  Returns false upon failure.
         * @throws InvalidArgumentTypeException Session key is not a string value.
         */
        public static function read_crypted_cookie($key)
        {
            if (!is_string($key)) {
                throw new InvalidArgumentTypeException('Session key must be string value');
            }
            if (isset($_COOKIE[$key])) {
                $cvalue = $_COOKIE[$key];
                return \Utils\Crypto::dechiffreSym($cvalue);
            }
            return false;
        }

        /**
         * Ecrit un cookie après l'avoir crypté.
         *
         * @param  string $key   String identifier.
         * @param  mixed  $value Single value or array of values to be written.
         * @return mixed Value or array of values written.
         * @throws InvalidArgumentTypeException Session key is not a string value.
         */
        public static function write_crypted_cookie($key, $value, $time = 3600 * 24 * 365)
        {
            if (!is_string($key)) {
                throw new InvalidArgumentTypeException('Cookie key must be string value');
            }
            $cvalue = \Utils\Crypto::chiffreSym($value);
            setcookie($key, $cvalue, time() + $time, '/', null, false, true);
            return $value;
        }

        public static function delete_cookie($key)
        {
            setcookie($key, "", time() - 3600, "/");
        }

        /**
         * Delete a value from the current session data.
         *
         * @param  string $key String identifying the array key to delete.
         * @return void
         * @throws InvalidArgumentTypeException Session key is not a string value.
         */
        public static function delete($key)
        {
            if (!is_string($key)) {
                throw new InvalidArgumentTypeException('Session key must be string value');
            }
            unset($_SESSION[$key]);
        }

        /**
         * Method generate_token
         * Cette fonction génère, sauvegarde et retourne un token
         *
         * @param string $nom Paramètre optionnel pour différencier les formulaires
         *
         * @return string
         */
        public static function generate_token(string $nom = ''): string
        {
            $token = uniqid(rand(), true);
            static::write($nom . '_token', $token);
            static::write($nom . '_token_time', time());
            return $token;
        }

        /**
         * Method verify_token
         *        Cette fonction vérifie le token
         *
         * @param string $token   Le token a
         *                        vérifier
         * @param int    $temps   Le temps de validité
         *                        (en secondes)
         * @param string $referer Le referer attendu (adresse absolue, rappelez-vous :D)
         * @param string $nom     Le nom optionnel si vous en avez défini
         *                        un lors de la création du token
         *
         * @return bool
         */
        public static function verify_token(string $token, int $temps, string $nom = ''): bool
        {
            if (static::read($nom . '_token') && static::read($nom . '_token_time')) {
                if (static::read($nom . '_token') == $token) {
                    if (static::read($nom . '_token_time') >= (time() - $temps)) {
                        return true;
                    }
                }
            }

            return false;
        }

        /**
         * Method verify_referer
         *        Cette fonction vérifie le referer
         *
         * @return bool
         */
        public static function verify_referer(): bool
        {
            if ($_SERVER['HTTP_REFERER'] == \App\Config::$base_url . $_SERVER['REQUEST_URI']) {
                return true;
            }
            return false;
        }
    }
}
