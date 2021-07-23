<?php
namespace Models {
    /**
     * PostModel
     */
    class ToolModel extends Model
    {
        /**
         * Method __construct
         *
         * @return void
         */
        public function __construct()
        {
            parent::__construct();
        }

        public function second_degre($params)
        {
            $a = intval($params['a']);
            $b = intval($params['b']);
            $c = intval($params['c']);
            $result = '<div class="result note">';
            if ($a == 0) {
                return "<div class=\"result\"><strong>Le coefficient a doit être un entier non nul !</strong></div>";
            }

            $racines = array();
            $result .= '<p>L\'équation est : <span class="mc-katex">';
            $result .= ($a == 1 ? '' : ($a == -1 ? '-' : $a)) . 'x^2';
            if ($b > 0) {
                $result .= '+' . ($b == 1 ? '' : $b) . 'x';
            } elseif ($b < 0) {
                $result .= ($b == -1 ? '-' : $b) . 'x';
            }
            if ($c > 0) {
                $result .= '+' . $c;
            } elseif ($c < 0) {
                $result .= $c;
            }
            $result .= ' = 0</span></p>';
            $delta = \utils\Maths::discriminant($a, $b, $c);
            $result .= '<p>Le discriminant vaut :<br /><span class="mc-katex">';
            $result .= '\Delta  = b^2-4ac = ';
            $result .= (($b < 0) ? '(' . $b . ')' : $b) . '^2-4\times' . (($a < 0) ? '(' . $a . ')' : $a) . '\times' . (($c < 0) ? '(' . $c . ')' : $c) . ' = ' . $delta . '</span></p>';
            if ($delta < 0) {
                $result .= '<p>Le discriminant est <strong>strictement négatif</strong>.</p><p> L\'équation n\'a <strong>pas de solution</strong>.';
            } else if ($delta == 0) {
                $result .= '<p>Le discriminant est <strong>nul</strong>.</p><p>L\'équation possède une <strong>solution unique</strong> : </p>';
                $result .= '<span class="mc-katex">x_{1} = ' . \utils\Maths::e_fraction('-b', '2a') . ' = ';
                $result .= \utils\Maths::e_fraction(-$b, '2\times' . $a) . ' = ';

                $result .= \utils\Maths::str_simplifie_fraction(-$b, 2 * $a) . '</span>';
            } else {
                $result .= '<p>Le discriminant est <strong>strictement positif</strong>.</p><p>';
                $exdelta = \utils\Maths::extrait_racine($delta);
                if ($exdelta['in'] == 1) {
                    $rac_delta = $exdelta['out'];
                    $result .= '<span class="mc-katex">\sqrt{\Delta} = ' . '\sqrt{' . $delta . '} = ' . $exdelta['out'] . '</span></p><p>';
                    $result .= 'L\'équation possède <strong>2 solutions</strong> :</p><p>';
                    $result .= '<span class="mc-katex">x_{1}  = ';
                    $result .= \utils\Maths::e_fraction('-b+\sqrt{\Delta}', '2a') . ' = ';
                    $result .= \utils\Maths::e_fraction('-' . (($b < 0) ? '(' . $b . ')' : $b) . '+' . $rac_delta, '2\times' . $a) . ' = ';
                    $result .= \utils\Maths::str_simplifie_fraction(-$b + $exdelta['out'], 2 * $a) . '</span><br />';
                    $result .= '<span class="mc-katex">x_{2}  = ';
                    $result .= \utils\Maths::e_fraction('-b-\sqrt{\Delta}', '2a') . ' = ';
                    $result .= \utils\Maths::e_fraction('-' . (($b < 0) ? '(' . $b . ')' : $b) . '-' . $rac_delta, '2\times' . $a) . ' = ';
                    $result .= \utils\Maths::str_simplifie_fraction(-$b - $exdelta['out'], 2 * $a) . '</span><br />';
                } else {
                    if ($exdelta['out'] != 1) {
                        $rac_delta = $exdelta['out'] . '\sqrt{' . $exdelta['in'] . '}';
                        $result .= '<span class="mc-katex">\sqrt{\Delta} = ' . '\sqrt{' . $delta . '} = \sqrt{' . $exdelta['out'] * $exdelta['out'] . '}\times\sqrt{' . $exdelta['in'] . '} = ' . $rac_delta . '</span></p><p>';
                    } else {
                        $rac_delta = '\sqrt{' . $exdelta['in'] . '}';
                    }
                    $den = 2 * $a;
                    $simp = \utils\Maths::get_pgcd(\utils\Maths::get_pgcd($b, $den), $exdelta['out']);
                    $den = $den / $simp;
                    $b_simp = $b / $simp;
                    if ($den < 0) {
                        $den = -$den;
                        $b_simp = -$b_simp;
                        $signe1 = '-';
                        $ssigne1 = '-';
                        $signe2 = '+';
                        $ssigne2 = '';
                    } else {
                        $signe1 = '+';
                        $ssigne1 = '';
                        $signe2 = '-';
                        $ssigne2 = '-';
                    }
                    $exdelta['out'] = $exdelta['out'] / $simp;
                    if ($b_simp == 0) {
                        if ($den == 1) {
                            $racines[] = $ssigne1 . (string) ($exdelta['out'] == 1 ? '' : $exdelta['out']) . '\sqrt{' . (string) ($exdelta['in']) . '}';
                            $racines[] = $ssigne2 . (string) ($exdelta['out'] == 1 ? '' : $exdelta['out']) . '\sqrt{' . (string) ($exdelta['in']) . '}';
                        } else {
                            $racines[] = e_fraction($ssigne1 . (string) ($exdelta['out'] == 1 ? '' : $exdelta['out']) . '\sqrt{' . (string) ($exdelta['in']) . '}', $den);
                            $racines[] = \utils\Maths::e_fraction($ssigne2 . (string) ($exdelta['out'] == 1 ? '' : $exdelta['out']) . '\sqrt{' . (string) ($exdelta['in']) . '}', $den);
                        }
                    } else {
                        if ($den == 1) {
                            $racines[] = (string) (-$b_simp) . $signe1 . (string) ($exdelta['out'] == 1 ? '' : $exdelta['out']) . '\sqrt{' . (string) ($exdelta['in']) . '}</span>';
                            $racines[] = (string) (-$b_simp) . $signe2 . (string) ($exdelta['out'] == 1 ? '' : $exdelta['out']) . '\sqrt{' . (string) ($exdelta['in']) . '}</span>';
                        } else {
                            $racines[] = \utils\Maths::e_fraction((string) (-$b_simp) . $signe1 . (string) ($exdelta['out'] == 1 ? '' : $exdelta['out']) . '\sqrt{' . (string) ($exdelta['in']) . '}', $den);
                            $racines[] = \utils\Maths::e_fraction((string) (-$b_simp) . $signe2 . (string) ($exdelta['out'] == 1 ? '' : $exdelta['out']) . '\sqrt{' . (string) ($exdelta['in']) . '}', $den);
                        }
                    }
                    $result .= 'L\'équation possède <strong>2 solutions</strong> :</p><p>';
                    $result .= '<span class="mc-katex">x_{1}  = ' . \utils\Maths::e_fraction('-b+\sqrt{\Delta}', '2a') . ' = ';
                    $result .= \utils\Maths::e_fraction('-' . (($b < 0) ? '(' . $b . ')' : $b) . '+' . $rac_delta, '2\times' . $a) . ' = ';
                    $result .= '<strong>' . $racines[0] . '</strong></span><br />';
                    $result .= '<span class="mc-katex">x_{2}  = ' . \utils\Maths::e_fraction('-b-\sqrt{\Delta}', '2a') . ' = ';
                    $result .= \utils\Maths::e_fraction('-' . (($b < 0) ? '(' . $b . ')' : $b) . '-' . $rac_delta, '2\times' . $a) . ' = ';
                    $result .= '<strong>' . $racines[1] . '</strong></span><br />';
                    if (($simp != 1) && ($simp != -1) && $signe1 == '-') {
                        $result .= '(après simplification par ' . $simp . ' et changement de signe au numérateur et au dénominateur)';
                    }
                    if (($simp != 1) && ($simp != -1) && $signe1 == '+') {
                        $result .= '(après simplification par ' . $simp . ')';
                    }
                    if (($simp * $simp == 1) && ($signe1 == '-')) {
                        $result .= '(après changement de signe au numérateur et au dénominateur)';
                    }
                }
            }
            $result .= '</p></div>';
            return $result;
        }
        public function algorithme_euclide($params)
        {
            $a = intval($params['a']);
            $b = intval($params['b']);
            $a0 = $a;
            $b0 = $b;
            $lignes = array();
            $result = "<table class=\"line\"><tbody><tr><th> &nbsp; Dividende &nbsp; </th><th> &nbsp; Diviseur &nbsp; </th><th> &nbsp; Quotient &nbsp; </th><th> &nbsp; Reste &nbsp; </th></tr>";
            $r = $a % $b;
            $q = floor($a / $b);
            $lignes[] = array('a' => $a, 'b' => $b, 'q' => $q, 'r' => $r);
            while ($r != 0) {
                $a = $b;
                $b = $r;
                $q = floor($a / $b);
                $r = $a % $b;
                $lignes[] = array('a' => $a, 'b' => $b, 'q' => $q, 'r' => $r);
            }
            $nb_lignes = count($lignes);
            for ($i = 0; $i < $nb_lignes; $i++) {
                $ligne = $lignes[$i];
                $style = ($i == $nb_lignes - 2) ? " style=\"color:red\"" : "";
                if (($i > 0) || ($a0 > $b0)) {
                    $result .= "<tr><td>" . $ligne['a'] . "</td><td>" . $ligne['b'] . "</td><td>" . $ligne['q'] . "</td><td" . $style . ">" . $ligne['r'] . "</td></tr>";
                }
            }

            $result .= "</tbody></table>";
            $result .= "<br>Le PGCD est le dernier reste non nul dans l'algorithme d'Euclide donc <b>PGCD ($a0 ; $b0) = <span style=\"color:red\">$b</span></b>";
            if ($b == 1) {
                $result .= "<br><b>$a0 et $b0 sont premiers entre eux.</b>";
            }
            return $result;

        }
        public function coefficients_bezout($params)
        {
            $a = intval($params['a']);
            $b = intval($params['b']);
            $a0 = $a;
            $b0 = $b;
            $lignes = array();
            $lignes[] = array('a' => 0, 'b' => 0, 'q' => 0, 'r' => 0, 'u' => 0, 'v' => 1);
            $result = "<table class=\"line\"><tbody><tr><th>Dividende</th><th>Diviseur</th><th>Quotient</th><th>Reste</th><th>Combinaison</th></tr>";
            $r = $a % $b;
            $q = floor($a / $b);
            $lignes[] = array('a' => $a, 'b' => $b, 'q' => $q, 'r' => $r, 'u' => 1, 'v' => -$q);
            $i = 1;
            while ($r != 0) {
                $a = $b;
                $b = $r;
                $q = floor($a / $b);
                $r = $a % $b;
                $lignes[] = array('a' => $a, 'b' => $b, 'q' => $q, 'r' => $r, 'u' => $lignes[$i - 1]['u'] - $q * $lignes[$i]['u'], 'v' => $lignes[$i - 1]['v'] - $q * $lignes[$i]['v']);
                $i++;
            }
            $nb_lignes = count($lignes);
            $res1 = '0&times;a + 1&times;b';
            $res2 = '1&times;a + 0&times;b';
            for ($i = 1; $i < $nb_lignes; $i++) {
                $ligne = $lignes[$i];
                $style = ($i == $nb_lignes - 2) ? " style=\"color:red\"" : "";
                $r = "<tr><td>" . $ligne['a'] . "</td><td>" . $ligne['b'] . "</td><td>" . $ligne['q'] . "</td><td" . $style . ">" . $ligne['r'] . "</td>";
                if ($i < $nb_lignes - 1) {
                    $r .= '<td> ';
                    $r .= $ligne['r'] . ' = ' . $ligne['a'] . ' - ' . $ligne['q'] . '&times;' . $ligne['b'] . '<br>';
                    if ($i != 1 && ($i != 2 || ($a0 > $b0))) {
                        $r .= $ligne['r'] . ' = (' . $res2 . ')' . ' - ' . $ligne['q'] . '&times;(' . $res1 . ')<br>';
                    }
                    $res2 = $res1;
                    $res1 = str_replace('+ -', '- ', $ligne['u'] . '&times;a ' . ' + ' . $ligne['v'] . '&times;b');
                    $r .= '<span' . $style . '>' . $ligne['r'] . ' = ' . $res1 . '</span>';
                    $r .= '</td></tr>';
                } else {
                    $r .= '<td>&nbsp; <br>&nbsp; <br> &nbsp; <br></td></tr>';
                }
                if (($i > 1) || ($a0 > $b0)) {
                    $result .= $r;
                }
            }

            $result .= "</tbody></table>";
            $result .= "<br>Le PGCD est le dernier reste non nul dans l'algorithme d'Euclide donc <b>PGCD ($a0 ; $b0) = <span style=\"color:red\">$b</span></b>";
            if ($b == 1) {
                $result .= "<br><b>$a0 et $b0 sont premiers entre eux.</b>";
            }
            $result .= "<p>Une solution au problème de Bézout est :</p>";
            $res1 = str_replace('a', $a0, $res1);
            $res1 = str_replace('b', $b0, $res1);
            $result .= "<p class=\"center\"><b>" . $res1 . " = " . $b . "</b></p>";
            return $result;
        }



    }
}
