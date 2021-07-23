<?php
namespace Utils {
    class Validator
    {
        private static $__errors = array();

        public static function validate($values, $tests)
        {
            static::$__errors = array();
            foreach ($tests as $fieldname => $test) {
                foreach ($test as $name => $params) {
                    if (!array_key_exists($fieldname, static::$__errors) || static::$__errors[$fieldname] == '') {
                        $method = 'static::__check_' . $name;
                        call_user_func($method, $fieldname, $values, $params);
                    }
                }
            }
        }

        /**
         * check input if value is passed
         * @return  $array
         */
        private static function __check_required($fieldname, $values, $params)
        {
            dbg();
            if (empty($values[$fieldname])) {
                static::$__errors[$fieldname] = "Ce champ est requis !";
            }
        }

        /**
         * check input if length is valid
         */
        private static function __check_length($fieldname, $values, $params)
        {
            if (array_key_exists('min', $params)) {
                if (strlen(trim($values[$fieldname])) < $params['min']) {
                    static::$__errors[$fieldname] = "Ce champ doit posséder au moins " . $params['min'] . " caractères !";
                }
            }
            if (array_key_exists('max', $params)) {
                if (strlen(trim($values[$fieldname])) < $params['min']) {
                    static::$__errors[$fieldname] = "Ce champ doit posséder au plus " . $params['max'] . " caractères !";
                }
            }

        }

        /**
         * check min
         */
        private static function __check_range($fieldname, $values, $params)
        {
            if (array_key_exists('min', $params)) {
                if ($values[$fieldname] < $params['min']) {
                    static::$__errors[$fieldname] = "La valeur doit être au moins égale à  " . $params['min'];
                }
            }

            if (array_key_exists('max', $params)) {
                if ($values[$fieldname] > $params['max']) {
                    static::$__errors[$fieldname] = "La valeur doit être au plus égale à " . $params['max'];
                }
            }
        }

        /**
         * check input if email is valid
         */
        private static function __check_valid_email($fieldname, $values, $params)
        {
            $email = filter_var($values[$fieldname], FILTER_SANITIZE_EMAIL);
            if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
                static::$__errors[$fieldname] = "L'adresse e-mail " . $email . " est invalide";
            }
        }

        /**
         * verfy if menu order is coherent with other fields
         */
        private static function __check_verify_menu_order($fieldname, $values, $params)
        {
        }

        /**
         * verfy if menu chapitre order begin with class number
         */
        private static function __check_chapitre_in_classe($fieldname, $values, $params)
        {
            $taxonomy_model = \Models\TaxonomyModel::getInstance();
            $chapitre_order = $taxonomy_model->get_taxonomy_field_value('chapitre', 'menu_order',$values[$fieldname]);
            $classe_order = $taxonomy_model->get_taxonomy_field_value('classe', 'menu_order', $values[$params['classe_fieldname']]);
            if (substr($chapitre_order, 0, 1) != $classe_order) {
                static::$__errors[$fieldname] = 'Ce chapitre n\'appartient pas à la classe choisie '.$chapitre_order.' '.$classe_order;
            }
        }
        /**
         * check if input don't exists in other row
         */
        private static function __check_dont_exist($fieldname, $values, $params)
        {
            $fields = [$params['db_fieldname'] => $values[$fieldname]];
            $row = $params['model']->select_by_fields($fields, 'all');

            if ($row && (!array_key_exists('id', $values) || $row['id'] != $values['id'])) {
                static::$__errors[$fieldname] = strpos($fieldname, 'mail') !== false ? "Cet email est déjà utilisé !" : "Cette valeur est déjà utilisée !";
            }
        }

        /**
         * check if input does exist
         */
        private static function __check_does_exists($fieldname, $values, $params)
        {
            $fields = [$params['db_fieldname'] => $values[$fieldname]];
            $row = $params['model']->select_by_fields($fields);
            if (!$row) {
                static::$__errors[$fieldname] = "Cet identifiant n'existe pas !";
            }
        }

        /**
         * check if user mail exists and is verified
         */
        private static function __check_verified_mail($fieldname, $values, $params)
        {
            $row = $params['model']->select_by_email($values[$fieldname], 'all');
            if (!$row) {
                static::$__errors[$fieldname] = "Adresse mail non trouvée !";
            } elseif ($row['status'] != "active") {
                static::$__errors[$fieldname] = "Vous n'avez pas validé votre adresse mail ! \n  Consultez votre messagerie !";
            }
        }

        /**
         * check confirm password
         */
        private static function __check_confirm_password($fieldname, $values, $params)
        {
            if ($values[$fieldname] != $values[$params['pswd_fieldname']]) {
                static::$__errors[$fieldname] = 'Ce champ doit être identique au champ "Mot de passe".';
            }
        }

        /**
         * check login : mail + password
         */
        private static function __check_verify_login($fieldname, $values, $params)
        {
            $row = $params['model']->select_by_email($values[$params['mail_fieldname']]);
            if (!$row) {
                static::$__errors[$fieldname] = 'Identifiants incorrects !';
            } elseif (!password_verify($values[$fieldname], $row['password'])) {
                static::$__errors[$fieldname] = 'Mot de passe incorrect !';
            }
        }

        /**
         * check if token is OK
         */
        private static function __check_verify_token($fieldname, $values, $params)
        {
            if (!\App\Session::verify_token($values[$fieldname], 300, $params['name'])) {
                static::$__errors['global'] = "Délai dépassé !";
            }
            if (!\App\Session::verify_referer()) {
                static::$__errors['global'] = "Referer incorrect !";
            }
        }

        private static function __check_slug_format($fieldname, $values, $params)
        {
            if (!preg_match('#^[a-z0-9-]*$#', $values[$fieldname])) {
                static::$__errors[$fieldname] = "Format incorrect !";
            }
        }

        /**
         * loop through and display all errors
         * @return  $array
         */
        public static function get_errors(): array
        {
            return static::$__errors;
        }

    }
}
