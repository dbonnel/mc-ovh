<?php
namespace Utils {
    class Crypto
    {
        private static $__cle_hex = 'ff8671b4cc293466675f6710ec50d949cc98670dfccd79244e69af04b5438d78';
        private static $__cle_asym_code_hex = "3073786e7d6bf6f7b6fc2d846823d09baca0ac613af61c38fd9fe6c9735aebad6e0f6ca17f7944a19c194779488c3a5ee36c8d20ccdacb92ddd84221e9a6e274";
        private static $__cle_asym_decode_hex = "e326d612f3e8b0668e360c7b1b478465485dfedc11f93e41816e2bf3107a87811e460f55f88b2fdabe9ef4625fb08555f27755f3eabc44823b3ae98205f03f2d";

        public static function chiffreSym($message)
        {
            // Le nonce est généré aléatoirement, de taille 24 caractères
            $nonce = random_bytes(SODIUM_CRYPTO_SECRETBOX_NONCEBYTES);
            // On chiffre le message avec la fonction sodium_crypto_secretbox
            $texte_chiffre = sodium_crypto_secretbox($message, $nonce, hex2bin(static::$__cle_hex));
            // On renvoie le texte chiffré sous forme hexadecimal
            return bin2hex($nonce) . bin2hex($texte_chiffre);
        }

        public static function dechiffreSym($texte_chiffre)
        {
            $code = hex2bin($texte_chiffre);
            return $message_dechiffre = sodium_crypto_secretbox_open(substr($code, 24), substr($code, 0, 24), hex2bin(static::$__cle_hex));
        }

        public static function chiffreAsym($message)
        {
            // Le nonce est généré aléatoirement, de taille 24 caractères
            $nonce = random_bytes(SODIUM_CRYPTO_SECRETBOX_NONCEBYTES);
            // On chiffre le message avec la fonction sodium_crypto_secretbox
            $texte_chiffre = sodium_crypto_box($message, $nonce, hex2bin(static::$__cle_asym_code_hex));
            // On renvoie le texte chiffré sous forme hexadecimal
            return bin2hex($nonce) . bin2hex($texte_chiffre);
        }

        public static function dechiffreAsym($texte_chiffre)
        {
            $code = hex2bin($texte_chiffre);
            return $message_dechiffre = sodium_crypto_box_open(substr($code, 24), substr($code, 0, 24), hex2bin(static::$__cle_asym_decode_hex));
        }

    }
}
