<?php
namespace Models {
    class UserModel extends Model
    {

        /**
         * Method __construct
         *
         * @return void
         */
        public function __construct()
        {
            parent::__construct('mc_users');
        }

        /**
         * Method select_by_email
         * Retourne Un utilisateur en foncion de son email
         *
         * @param string $email Mail de l'utilisateur
         * @param string $status Filtre sur le status (par défaut 'active)
         *
         * @return array tableau des propriétés de l'utilisateur
         */
        public function select_by_email(string $email, string $status = 'active'): array
        {
            return $this->select_by_fields(['email' => $email], $status);
        }

        /**
         * Method createUser
         * Créé un utilisateur en base de données à partir d'un tableau
         *
         * @param array $data tableau des propriétés de l'utilisateur
         *
         * @return void
         */
        public function create_user(array $data)
        {
            dbg($data);
            return $this->insert($data);
        }

    }
}
