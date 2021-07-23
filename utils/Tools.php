<?php
namespace Utils {
    class Tools
    {
        /**
         * Method slugify
         *
         * @param $string $string [explicite description]
         *
         * @return void
         */
        public static function slugify($string)
        {
            $a = ['à', 'á', 'â', 'ã', 'ä', 'å', 'æ', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', 'ù', 'ú', 'û', 'ü', 'œ'];
            $b = ['a', 'a', 'a', 'a', 'a', 'a', 'ae', 'c', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'n', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'oe'];
            $result = str_replace($a, $b, strtolower($string));
            return preg_replace('/[^a-z0-9]/', '-', $result);
        }

        /**
         * Method scan_dir
         * Scanne récursivement un dossier en excluant certains répertoires
         *
         * @param string $dir Dossier à scanner
         * @param array $exclude Sous-dossiers à exclure de la liste
         *
         * @return array
         */
        public static function scan_dir(string $dir, array $exclude = []): array
        {
            $result = [];
            foreach (scandir($dir) as $filename) {
                if ($filename[0] === '.') {
                    continue;
                }
                $file_path = $dir . '/' . $filename;
                if (!in_array($file_path, $exclude)) {
                    if (is_dir($file_path)) {
                        foreach (static::scan_dir($file_path, $exclude) as $child_filename) {
                            $result[] = $filename . '/' . $child_filename;
                        }
                    } else {
                        $result[] = $filename;
                    }
                }
            }
            return $result;
        }

        /**
         * Method file_date
         * Ajoute la date à une liste de fichier
         *
         * @param array $filenames liste des fichiers
         * @param string $separator séparateur ajouté devant la date
         *
         * @return array
         */
        public static function file_date(array $filenames = [], string $separator = "|"): array
        {
            $result = [];
            foreach ($filenames as $filename) {
                $result[] = $filename . $separator . date("y-m-d:H:i:s", filemtime($filename));
            }
            return $result;
        }

        /**
         * Encode data to Base64URL
         * @param string $data
         * @return boolean|string
         */
        public static function base64url_encode($data)
        {
            // First of all you should encode $data to Base64 string
            $b64 = base64_encode($data);

            // Make sure you get a valid result, otherwise, return FALSE, as the base64_encode() function do
            if ($b64 === false) {
                return false;
            }

            // Convert Base64 to Base64URL by replacing “+” with “-” and “/” with “_”
            $url = strtr($b64, '+/', '-_');

            // Remove padding character from the end of line and return the Base64URL result
            return rtrim($url, '=');
        }

        /**
         * Decode data from Base64URL
         * @param string $data
         * @param boolean $strict
         * @return boolean|string
         */
        public static function base64url_decode($data, $strict = false)
        {
            // Convert Base64URL to Base64 by replacing “-” with “+” and “_” with “/”
            $b64 = strtr($data, '-_', '+/');

            // Decode Base64 string and return the original data
            return base64_decode($b64, $strict);
        }
    }
}
