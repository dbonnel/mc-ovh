<?php
namespace Models {
    class TaxonomyModel extends Model
    {
        private static $instance = null;
        private $taxonomies = [];

        /**
         * Method __construct
         *
         * @return void
         */
        public function __construct()
        {
            parent::__construct('mc_taxonomies');
        }

        /**
         * Méthode qui crée l'unique instance de la classe
         * si elle n'existe pas encore puis la retourne.
         *
         *
         */
        public static function getInstance(): TaxonomyModel
        {

            if (is_null(self::$instance)) {
                self::$instance = new TaxonomyModel();
            }

            return self::$instance;
        }

        /**
         * Method get_taxonomy
         *
         * Retourne la liste des valeurs possibles dans une taxonomie
         *
         * @param string $taxonomy La taxoxonomie (par ex. classe) dont on souhaite les valeurs
         *
         * @return array
         */
        public function get_taxonomy(string $taxonomy)
        {

            if (count($this->taxonomies) == 0) {
                $this->taxonomies = $this->select_many_by_fields([], ['menu_order']);
            }
            $table = [];
            foreach ($this->taxonomies as $ligne) {
                if ($ligne['taxonomy'] == $taxonomy) {
                    $table[$ligne['slug']] = $ligne;
                }
            }
            return $table;
        }

        public function get_taxonomy_field(string $taxonomy, string $fieldname)
        {
            $result = [];
            foreach ($this->get_taxonomy($taxonomy) as $slug => $values) {
                $result[$slug] = $values[$fieldname];
            }
            return $result;
        }

        public function get_taxonomy_field_value(string $taxonomy, string $fieldname, string $key)
        {
            $ligne = $this->get_taxonomy_field($taxonomy, $fieldname);
            return $ligne[$key];
        }

    }
}
