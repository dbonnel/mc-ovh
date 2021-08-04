<?php
namespace Models {

    abstract class Model
    {
        protected $table;
        public $db;
        public $pagination;

        /**
         * Method __construct
         *
         * @param string $table Table SQL utilisée par le model
         *
         * @return void
         */
        public function __construct(?string $table=null)
        {
            $this->table = $table;
        }

        /**
         * Method open_connexion
         *
         * @return void
         */
        private function open_connexion(): void
        {
            $this->db = new \PDO('mysql:dbname=' . \App\Config::$db_name . ';host=' . \App\Config::$db_host, \App\Config::$db_username, \App\Config::$db_password);
            $this->db->exec('SET NAMES utf8');
            $this->db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION); //Error Handling
        }

        /**
         * Method close_connexion
         *
         * @return void
         */
        private function close_connexion(): void
        {
            $this->db = null;
        }

        /**
         * Method sql_exec
         *
         * @param $sql $sql [explicite description]
         * @param $data $data [explicite description]
         *
         * @return PDOStatement
         */
        private function sql_exec($sql, $data): \PDOStatement
        {
            $sql = trim(str_replace(' {table} ', ' ' . $this->table . ' ', $sql));
            dbg('SQL :', $sql);
            dbg('Data :', $data);
            $stmt = $this->db->prepare($sql);
            //    print_r($sql);
            //    print_r($this->prefix_sqlkeys($data));
            $stmt->execute($this->prefix_sqlkeys($data));
            return $stmt;
        }

        /*********************************************************************************
         *                       ECRITURE DANS LA BASE UPDATE, INSERT, DELETE
         *********************************************************************************/

        /**
         *     Insère, met à jour ou supprime un enregistrement dans une table SQL
         *     à partir d'une requête préparée
         *     @param string $sql : modèle PDO de la requête
         *     @param array $data : table des valeurs à insérer dans la requête de la forme ['cle' => 'valeur']
         *     @return int id de l'enregistrement inséré
         */
        public function db_write(string $sql, array $data = [])
        {
            $this->open_connexion();
           // print_r($sql . '   ');
            $stmt = $this->sql_exec($sql, $data);
            $id = $this->db->lastInsertId();
            $this->close_connexion();
            return $id;
        }

        /**
         *     Crée une requête préparée INSERT et insère un enregistrement dans la table SQL courante
         *     @param array $data : table des valeurs à insérer dans la requête de la forme ['cle' => 'valeur']
         *     @return int id de l'enregistrement inséré
         */
        public function insert(array $data)
        {

            $sql = (new \Utils\SqlRequest('INSERT'))->set_fields(array_keys($data))->request();
            return $this->db_write($sql, $data);
        }

        /**
         *     Crée une requête préparée REPLACE et insère ou met à jour un enregistrement dans la table SQL courante
         *     @param array $data : table des valeurs à insérer dans la requête de la forme ['cle' => 'valeur']
         *     @return int id de l'enregistrement inséré
         */
        public function replace(array $data)
        {
            $sql = (new \Utils\SqlRequest('REPLACE'))->set_fields(array_keys($data))->request();
            return $this->db_write($sql, $data);
        }

        /**
         *     Met à jour un enregistrement dans la table SQL $table
         *     @param array $data : table des champs/valeurs à mettre à jour
         *                  Les autres champs ne sont pas modifiés
         */
        public function update_by_id(int $id, array $data)
        {
            unset($data['id']);
            $sql = (new \Utils\SqlRequest('UPDATE'))->set_where(['id'])->set_fields(array_keys($data))->request();
            dbg('sql', $sql);
            $data['id'] = $id;
            return $this->db_write($sql, $data);
        }

        /**
         *     Supprime virtuellement un enregistrement de la table SQL $table en renseignant le
         *     champs 'deleted_at'
         *     @param int $id : id de l'enregistrement à spprimer virtuellement
         */
        public function delete_by_id(int $id)
        {
            return $this->update_by_id($id, ['status' => "deleted"]);
        }

        /**
         *     Restaure un enregistrement supprimé  virtuellement de la table SQL $table en
         *     remettant à NULL le champs 'deleted_at'
         *     @param int $id : id de l'enregistrement à restaurer
         */
        public function restore_by_id(int $id)
        {
            return $this->update_by_id($id, ['status' => "active"]);
        }

        /*********************************************************************************
         *                        LECTURE DE LA BASE (SELECT)
         *********************************************************************************/

        /**
         * Method select_one
         *
         * Retourne le premier résultat d'une requête SQL
         * @param string $sql : modèle PDO de la requête {table} est remplacé par le nom de
         *               la table associée au modèle.
         * @param array $data : table des valeurs à insérer dans la requête de la forme ['cle' => 'valeur']
         *
         * @return array
         */
        public function select_one(string $sql, array $data = []): ?array
        {
            $this->open_connexion();
            $stmt = $this->sql_exec($sql, $data);
            $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            $this->close_connexion();
            return $result ? $result : NULL;
        }

        /**
         * Method select_many
         * Retourne l'ensemble des résultats d'une requête SQL
         *
         * @param string $sql  : modèle PDO de la requête {table} est remplacé par le nom de
         *                  la table associée au modèle.
         * @param array $data : table des valeurs à insérer dans la requête de la forme ['cle' => 'valeur']
         *
         * @return array
         */
        public function select_many(string $sql, array $data = []): array
        {
            $this->open_connexion();
            $stmt = $this->sql_exec($sql, $data);
            $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            $this->close_connexion();
            return $result;
        }

        /**
         *     Retourne le nombre de résultats d'une requête SQL
         *     @param string $sql : modèle PDO de la requête {table} est remplacé par le nom de
         *                  la table associée au modèle.
         *     @param array $data : table des valeurs à insérer dans la requête de la forme ['cle' => 'valeur']
         */
        public function select_count(string $sql, array $data = [])
        {
            $this->open_connexion();
            $sql = preg_replace('#SELECT .* FROM#i', 'SELECT count(*) FROM', $sql);
            $stmt = $this->sql_exec($sql, $data);
            $result = $stmt->fetchColumn();
            $this->close_connexion();
            return $result;
        }

        /**
         *     Retourne l' enregistrement de la table SQL $table d'après un ou plusieurs champs
         *     @param int $fields : table champs/valeurs sur laquelle s'effectue la sélection
         *     @param bool $status : indique si l'on doit également chercher dans les
         *            enregistrements virtuellement supprimés (nécessaire pour empêcher les doublons)
         */
        public function select_by_fields(array $fields, string $status = 'active')
        {
            if ($status != 'all') {
                $fields['status'] = $status;
            }
            $sql = (new \Utils\SqlRequest('SELECT'))->set_where(array_keys($fields))->request();
            return $this->select_one($sql, $fields);
        }
        /**
         *     Retourne des enregistrements de la table SQL $table d'après un ou plusieurs champs
         *     @param array $fields : table champs => valeurs de la selection(ex : ['classe' => 'sixieme'])
         *     @param array $order : table des champs à trier tri(ex : ['menu_order DESC', 'name'])
         *     @param string $status : indique si l'on doit également chercher dans les
         *            enregistrements virtuellement supprimés (nécessaire pour empêcher les doublons)
         */

        public function select_many_by_fields(array $fields, array $order = [], string $status = 'active')
        {
            if ($status != 'all') {
                $fields['status'] = $status;
            }
            $sql = (new \Utils\SqlRequest('SELECT'))->set_where(array_keys($fields))->set_order($order)->request();
            return $this->select_many($sql, $fields);
        }
        /**
         *     Retourne l' enregistrement de la table SQL $table d'après son id
         *     @param int $id : id de l'enregistrement à retourner
         *     @param bool $status : indique si l'on doit également chercher dans les
         *            enregistrements virtuellement supprimés (nécessaire pour empêcher les doublons)
         */
        public function select_by_id(int $id, string $status = 'active')
        {
            return $this->select_by_fields(['id' => $id], $status);
        }

        /**
         *  Ajoute ":" devant le nom des clés d'une table
         */
        public function prefix_sqlkeys(array $table)
        {
            $result = [];
            foreach ($table as $key => $value) {
                $result[':' . $key] = $value;
            }
            // print_r($result);
            return $result;
        }

    }
}
