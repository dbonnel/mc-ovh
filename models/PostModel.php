<?php
namespace Models {
    /**
     * PostModel
     */
    class PostModel extends Model
    {
        /**
         * Method __construct
         *
         * @return void
         */
        public function __construct()
        {
            parent::__construct('mc_posts');
        }

        public function select_by_slug(string $slug, string $status = 'active')
        {
            return $this->select_by_fields(['slug' => $slug], $status);
        }

        public function calc_menu_order(array $data)
        {
            if (!$data['classe'] || $data['classe'] === 'sans-classe') {
                return 0;
            }
            $taxonomy_model = \Models\TaxonomyModel::getInstance();
            $categories = $taxonomy_model->get_taxonomy_field('categorie', 'menu_order');
            $chapitres = $taxonomy_model->get_taxonomy_field('chapitre', 'menu_order');
            $difficults = $taxonomy_model->get_taxonomy_field('difficult', 'menu_order');
            $category_order = $categories[$data['category']];
            $chapitre_order = $chapitres[$data['chapitre']];
            $difficult_order = $difficults[$data['difficult']];
            return $chapitre_order * 100000 + $category_order * 10000 + $difficult_order * 1000 + $data['menu_order'] % 1000;
        }

        public function calc_annale_order(array $data)
        {

            if (!$data['annale_classe'] || $data['annale_classe'] === 'no-annale') {
                return 0;
            }

            $taxonomy_model = \Models\TaxonomyModel::getInstance();
            $annale_classes = $taxonomy_model->get_taxonomy_field('annale-classe', 'menu_order');
            $annale_annees = $taxonomy_model->get_taxonomy_field('annale-annee', 'menu_order');
            $annale_lieux = $taxonomy_model->get_taxonomy_field('annale-lieu', 'menu_order');
            $annale_classe_order = $annale_classes[$data['annale_classe']];
            $annale_annee_order = $annale_annees[$data['annale_annee']];
            $annale_lieu_order = $annale_lieux[$data['annale_lieu']];
            return $annale_classe_order * 1000000 + $annale_annee_order * 10000 + $annale_lieu_order * 100 + $data['annale_order'] % 100;
        }

        public function getSommaireAnnales($annale_classe, $annale_annee = false, $annale_lieu = false)
        {
            $order = 'annale_order';
            if ($annale_annee && $annale_lieu) {
                $where = ['status' => 'active', 'annale_classe' => $annale_classe, 'annale_annee' => $annale_annee, 'annale_lieu' =>
                    $annale_lieu];
            } else {
                $where = ['status' => 'active', 'annale_classe' => $annale_classe];
            }
            $sql = (new \Utils\SqlRequest('SELECT'))
                ->set_fields(['title', 'slug', 'category', 'difficult', 'annale_classe', 'annale_lieu', 'annale_annee', $order])
                ->set_order([$order])
                ->set_where(array_keys($where))
                ->request();
            $result = $this->select_many($sql, $where);
            $table = [];

            if ($result) {
                $last_annee = '';
                $table_annee = [];
                foreach ($result as $ligne) {
                    $annee = $ligne['annale_annee'];
                    if ($last_annee != $annee) {
                        array_unshift($table, $table_annee);
                        $table_annee = [];
                        $last_annee = $annee;
                    }
                    $table_annee[] = $ligne;
                }
                array_unshift($table, $table_annee);
                array_pop($table);
            }
            dbg('sommaire', $table);
            return $table;
        }

        public function getSommaire($classe, $chapitre = '')
        {
            $order = 'menu_order';

            if ($chapitre === '') {
                $where = ['status' => 'active', 'classe' => $classe];
            } else {
                $where = ['status' => 'active', 'classe' => $classe, 'chapitre' => $chapitre];
            }
            $sql = (new \Utils\SqlRequest('SELECT'))
                ->set_fields(['title', 'slug', 'category', 'difficult', $order])
                ->set_order([$order])
                ->set_where(array_keys($where))
                ->request();
            $result = $this->select_many($sql, $where);
            $table = [];
            if ($result) {
                $i = -1;
                foreach ($result as $ligne) {
                    if ($ligne['category'] == 'cours') {
                        $i++;
                        $table[$i]['cours'] = $ligne;
                    } elseif ($i >= 0 && $ligne[$order] > 0) {
                        if (!array_key_exists($ligne['category'], $table[$i])) {
                            $table[$i][$ligne['category']] = [];
                        }
                        $table[$i][$ligne['category']][] = $ligne;
                    }
                }
            }
            dbg('sommaire', $table);
            return $table;
        }

    }
}
