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
        private function qcmGetQcmArray($content)
        {
            $liste_questions = explode('§Q:', $content);
            // print_r($liste_questions);
            $prefix = array_shift($liste_questions);
            $questions = array();
            foreach ($liste_questions as $i_question => $question) {
                $liste_propositions = explode('§', $question);
                // print_r($liste_propositions);
                $questions[$i_question]['libelle'] = array_shift($liste_propositions);
                $propositions = array();
                foreach ($liste_propositions as $i_proposition => $proposition) {
                    if (substr($proposition, 0, 3) == 'S+:') {
                        $propositions[$i_proposition]['libelle'] = substr($proposition, 3);
                        $questions[$i_question]['multiple'] = false;
                        $propositions[$i_proposition]['correct'] = true;
                    } elseif (substr($proposition, 0, 3) == 'S-:') {
                        $propositions[$i_proposition]['libelle'] = substr($proposition, 3);
                        $questions[$i_question]['multiple'] = false;
                        $propositions[$i_proposition]['correct'] = false;
                    } elseif (substr($proposition, 0, 3) == 'M+:') {
                        $propositions[$i_proposition]['libelle'] = substr($proposition, 3);
                        $questions[$i_question]['multiple'] = true;
                        $propositions[$i_proposition]['correct'] = true;
                    } elseif (substr($proposition, 0, 3) == 'M-:') {
                        $propositions[$i_proposition]['libelle'] = substr($proposition, 3);
                        $questions[$i_question]['multiple'] = true;
                        $propositions[$i_proposition]['correct'] = false;
                    } elseif (substr($proposition, 0, 2) == 'R:') {
                        $questions[$i_question]['correction'] = substr($proposition, 2);
                    }
                    $questions[$i_question]['propositions'] = $propositions;
                }
            }
            return array('prefix' => $prefix, 'questions' => $questions);
        }
        private function qcmFormat($content)
        { //TODO: create template
            $qcm_array = $this->qcmGetQcmArray($content);
            $prefix = $qcm_array['prefix'];
            $questions = $qcm_array['questions'];
            //    print_r($qcm_array); exit;
            $result = '<form action=""  accept-charset="UTF-8" method="get" id="mcqcm-form">';
            // name="qcm-'.$post->ID.'">';
            $result .= '<div class="qcm">';
            if (isset($prefix)) {
                $result .= '<p class="prefix">' . $prefix . '</p>';
            }
            foreach ($questions as $i_question => $question) {
                $result .= '<div class="question">';
                $result .= '<h3>Question ' . ($i_question + 1) . ' : </h3>';
                $result .= '<p>' . $question['libelle'] . '</p>';
                if ($question['multiple']) {
                    $result .= '<p><em>Cette question peut comporter plusieurs réponses exactes. Vous devez cocher <strong>toutes</strong> les réponses correctes.</em></p>';
                }
                $result .= '<table>';
                foreach ($question['propositions'] as $i_proposition => $proposition) {
                    if ($question['multiple']) {
                        $result .= '<tr><td class="option"><input type="checkbox" name="reponse_' . $i_question . '[' . $i_proposition . ']" value="' . $i_proposition . '"  /></td><td class="reponse">' . $proposition['libelle'] . '</td></tr>';
                    } else {
                        $result .= '<tr><td class="option"><input type="radio" name="reponse_' . $i_question . '" value="' . $i_proposition . '" id="reponse_' . $i_question . '_' . $i_proposition . '" /></td><td class="reponse"><label for="reponse_' . $i_question . '_' . $i_proposition . '">' . $proposition['libelle'] . '</label></td></tr>';
                    }
                }
                $result .= '</table>';
                $result .= '</div>';
            }
            $result .= '<input type="submit" name="op" id="mcqcm-submit" value="Vérifiez vos réponses"  class="bouton" />';
            $result .= '</div>';
            $result .= '</form>';


            return $result;
        }

        private function qcmExecQcm($content)
        { //TODO: create template
            // echo '<pre>';
            // print_r($this->qcmGetQcmResultArray($content));
            // echo '</pre>';exit;

            $qcmresult_array = $this->qcmGetQcmResultArray($content);
            $questions = $qcmresult_array['questions'];
            $counter_ok = $qcmresult_array['counter_ok'];
            $prefix = $qcmresult_array['prefix'];
            $counter_questions = $qcmresult_array['counter_questions'];
            $result = '<div id="mcqcm-result"><div class="qcm"><p class="score">Votre score : ' . $counter_ok . ' / ' . $counter_questions . '</p>';
            if (isset($prefix)) {
                //    $result .=  '<p class="prefix">' . $prefix . '</p>';
            }
            foreach ($questions as $i_question => $question) {
                $result .= '<div class="question">';
                $result .= '<h3>Question ' . ($i_question + 1) . ' : </h3>';
                $result .= '<p>' . $question['libelle'] . '</p>';
                $result .= '<table class="reponses">';
                $result .= '<tr><th>Vous</th><th>Solution</th><th>&nbsp;</th></tr>';
                foreach ($question['propositions'] as $i_proposition => $proposition) {
                    $result .= '<tr><td class="coche"><img src="/assets/imgsvg/' . ($proposition['reponse_eleve'] ? ($proposition['correct'] ? '' : 'r') . 'selected.svg' : 'unselected.svg') . '" /></td>';
                    $result .= '<td class="coche"><img src="/assets/imgsvg/' . ($proposition['correct'] ? 'selected.svg' : 'unselected.svg') . '" /></td><td>' . trim($proposition['libelle']) . '</td></tr>';
                }
                $result .= '<tr class="solution"><td  colspan="2" class="coche-solution"><img src="/assets/imgsvg/' . ($question['question_ok'] ? 'selected.svg' : 'incorrect.svg') . '" /></td><td >';
                if ($question['question_ok']) {
                    $result .= '<p class="rep_ok">Réponse exacte !</p>';
                } else {
                    $result .= '<p class="rep_error">Mauvaise réponse !</p>';
                }
                $result .= (isset($question['correction']) ? $question['correction'] : '') . '</td></tr>';
                $result .= '</table>';
                $result .= '</div>';
            }
            $result .= '</div></div>';
            return $result;

        }

        public function qcmGetQcmResultArray($content)
        {
            /*
            FORMAT DE LA TABLE
            Array(
            [prefix] => ...,
            [$i_question] => Array(
            [libelle] => ...
            [multiple] => plusieurs choix possibles?
            [correction] => ...
            [question_ok] => l'élève a-t-il répondu correctement à cette question?
            [propositions] => Array(
            [$i_proposition] => Array(
            [libelle] => ...
            [correct] => faut-il cocher la case?
            [reponse_eleve] => l'élève a-t-il coché la case?
            [reponse_eleve_ok] => case correctement cochée par l'élève
             */
            $qcm_array = $this->qcmGetQcmArray($content);
            $prefix = $qcm_array['prefix'];
            $questions = $qcm_array['questions'];
            $reponses = $_GET;

            $counter_ok = 0;
            $counter_questions = 0;
            foreach ($questions as $i_question => $question) {
                $question_ok = true;
                foreach ($question['propositions'] as $i_proposition => $proposition) {
                    if ($question['multiple']) {
                        $reponse_eleve = isset($reponses['reponse_' . $i_question][$i_proposition]);
                    } else {

                        $reponse_eleve = isset($reponses['reponse_' . $i_question]) && ($reponses['reponse_' . $i_question] == $i_proposition) ? 1 : '';
                    }
                    $reponse_eleve_ok = ($reponse_eleve == $proposition['correct']);
                    $question_ok = $question_ok && $reponse_eleve_ok;
                    $questions[$i_question]['propositions'][$i_proposition]['reponse_eleve'] = $reponse_eleve;
                    $questions[$i_question]['propositions'][$i_proposition]['reponse_eleve_ok'] = $reponse_eleve_ok;
                }
                $questions[$i_question]['question_ok'] = $question_ok;
                if ($question_ok) {
                    $counter_ok++;
                }
                $counter_questions++;
            }
            return array('prefix' => $prefix, 'counter_questions' => $counter_questions, 'counter_ok' => $counter_ok, 'questions' => $questions);
        }

        public function qcmData($post)
        {
            $content = $post['content'];
            $content = str_replace('<div class="qcm-item-q"></div>', '§Q:', $content);
            $content = str_replace('<div class="qcm-item-sok"></div>', '§S+:', $content);
            $content = str_replace('<div class="qcm-item-snok"></div>', '§S-:', $content);
            $content = str_replace('<div class="qcm-item-r"></div>', '§R:', $content);

            if (array_key_exists('op', $_GET)) {
                $result = $this->qcmExecQcm($content);
            } else {
                $result = $this->qcmFormat($content);
            }
            return $result;
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
