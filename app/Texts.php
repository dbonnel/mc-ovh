<?php
namespace App {
    class Texts
    {
        private static $__texts;

        public static function init()
        {
            static::$__texts = [
                // placeholder
                'plh_email' => "Adresse mail",
                'plh_pswd' => "Mot de passe",
                'plh_confirm_pswd' => "Confirmez le mot de passe",
                // popup
                'pup_title_confirm_delete' => "Confirmer la suppression ?",
                'pup_message_confirm_delete' =>'Êtes-vous sûr de vouloir supprimer cet enregistrement ?',
                'pup_title_confirm_restore' => "Confirmer la restauration ?",
                'pup_message_confirm_restore' =>'Êtes-vous sûr de vouloir restaurer cet enregistrement ?'

            ];
        }

        public static function getText($key, $params=[])
        {
            if (count($params) == 0) {
                return static::$__texts[$key];
            } else {
                return vsprintf(static::$__texts[$key], $params);
            }
            
            
        }
    }
}
