<?php
namespace Utils {
    class Maths
    {
        public static function get_pgcd($a, $b)
        {
            $r = $a % $b;
            while ($r != 0) {
                $a = $b;
                $b = $r;
                $r = $a % $b;
            }
            return abs($b);
        }

        public static function e_fraction($n, $d)
        {
            return '\frac{' . (string) ($n) . '}{' . (string) ($d) . '}';
        }

        public static function decompose($n)
        {
            $premier = array(2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
                101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199,
                211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293,
                307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397,
                401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499,
                503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599,
                601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691,
                701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797,
                809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887,
                907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997);
            $decomp = array();
            if ($n < 0) {
                $n = -$n;
            }
            if ($n < 2) {
                return $decomp;
            }
            for ($i = 0; $i < count($premier); $i++) {
                while ($n % $premier[$i] == 0) {
                    $n = $n / $premier[$i];
                    $decomp[] = $premier[$i];
                    if ($n == 1) {
                        return $decomp;
                    }
                }
            }
            $decomp[] = $n;
            return $decomp;
        }
        public static function extrait_racine($n)
        {
            $decomp = self::decompose($n);
            $result = array('out' => 1, 'in' => 1);
            $prevfacteur = 1;
            foreach ($decomp as $facteur) {
                if ($facteur == $prevfacteur) {
                    $result['in'] /= $facteur;
                    $result['out'] *= $facteur;
                    $prevfacteur = 1;
                } else {
                    $result['in'] *= $facteur;
                    $prevfacteur = $facteur;
                }
            }
            return $result;
        }
        public static function str_extrait_racine($n)
        {
            $rac = self::extrait_racine($n);
            if ($rac['in'] == 1) {
                $result = $rac['out'];
            } else {
                $result = $rac['out'] . "&radic;" . $rac['in'];
            }
            return $result;
        }
        public static function discriminant($a, $b, $c)
        {
            return $b * $b - (4 * $a * $c);
        }

        public static function str_simplifie_fraction($n, $d)
        {
            if ($d < 0) {
                $n = -$n;
                $d = -$d;
            }
            $simp = self::get_pgcd($n, $d);
            $n = $n / $simp;
            $d = $d / $simp;
            if (($d == 1)) {
                return (string) ($n);
            } else {
                return e_fraction($n, $d);
            }
        }

        public static function combinaisons($n, $k)
        {
            if ($k < 0) {
                return 0;
            }
            if ($k == 0 || $k == $n) {
                return 1;
            }
            $result = $n;
            for ($i = 2; $i <= $k; $i++) {
                $result *= ($n + 1 - $i) / $i;
            }
            return $result;
        }
        public static function combinaisons_array($n)
        {
            $result = array(0 => 1);
            $combinaison = 1;
            for ($i = 1; $i <= $n; $i++) {
                $combinaison *= ($n + 1 - $i) / $i;
                $result[$i] = $combinaison;
            }
            return $result;
        }

        public static function binomiale_array($n, $p)
        {
            $combinaisons = self::combinaisons_array($n);
            $rapport = $p / (1 - $p);
            $proba = pow(1 - $p, $n);
            for ($i = 0; $i <= $n; $i++) {
                $result[$i] = $combinaisons[$i] * $proba;
                $proba *= $rapport;
            }
            return $result;
        }
        public static function binomiale_cum_array($n, $p)
        {
            $b = self::binomiale_array($n, $p);
            $result[0] = $b[0];
            for ($i = 1; $i <= $n; $i++) {
                $result[$i] = $b[$i] + $result[$i - 1];
            }
            return $result;
        }

        public static function loi_binomiale_cumulee($param)
        {
            $n = intval($param['n']);
            $p = floatval($param['p']);
            $seuil = floatval((100 - $param['s']) / 200);
            $table = binomiale_cum_array($n, $p);
            //        return print_r(binomiale_cum_array($n, $p),false);
            $result = <<<EOF
                    <table id="loi-binomiale-cumulee">
                    <tr><td>
                    <table id="colonne">
                    <tr><th><span class="mc-katex">k</span></th><th><span class="mc-katex">p(X \leq k)</span></th></tr>
        EOF;
            $part = 0;
            $nblignes = count($table);
            $nbligcol = floor(($nblignes + 3) / 4);
            //       $seuil = 0.95;//$seuil=set_value('val_s')>0?(1-set_value('val_s')/100)/2:2;
            for ($i = 0; $i < $nblignes; $i++) {
                $class = "";
                if (($part == 0) && ($table[$i]) > $seuil) {
                    $part = 1;
                    $class = ' class="seuil"';
                }
                if (($part == 1) && ($table[$i]) >= 1 - $seuil) {
                    $part = 2;
                    $class = ' class="seuil"';
                }
                $result .= '<tr><th' . $class . '>' . $i . '</th><td' . $class . '>' . sprintf('%1.9f', $table[$i]) . '</td></tr>';
                if ((($i + 1) % $nbligcol == 0) && ($nblignes > $i + 1)) {
                    $result .= '</table></td><td><table id="colonne"><tr><th><span class="mc-katex">k</span></th><th><span class="mc-katex">p(X \leq k)</span></th></tr>';
                }
            }
            $result .= <<<EOF
                    </table>
                    </td></tr>
                    </table>
        EOF;
            return $result;
        }

     }
}
