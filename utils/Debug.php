<?php
namespace Utils {
    class Debug
    {
        private static $active = false;
        private static $modules = array();
        private static $log = '';
 
        /**
         * Method logvar
         *
         * @param string $text [explicite description]
         * @param $value $value [explicite description]
         *
         * @return void
         */
        public static function logvar(string $module = 'always', $value = null)
        {
            if (static::$active && (in_array($module, static::$modules) || in_array('all', static::$modules))) {
                $bt = debug_backtrace();
                static::$log .= $bt[1]['file'] . (array_key_exists(2, $bt) ? ':' . $bt[2]['function'] : '') . ' @ ' . $bt[1]['line'];
                static::$log .= " \n" . $module . "\n" . print_r($value, true) . "\n\n========================\n\n";
               // print_r(static::$log); 
                // file_put_contents($dbg_file,  "\n=============   " . $bt[1]['file'] . ' line  ' . $bt[1]['line'] . "   =============\n" . $text . (($value == '') ? '' : (' := ' . print_r($bt, true))) . "\n\n", FILE_APPEND);
            }
        }

        /**
         * Method set_debug
         *
         * @param bool $active [explicite description]
         *
         * @return void
         */
        public static function set_debug(?string $modules = null)
        {
            static::$active = $modules !== null;

            if ($_SERVER['REQUEST_URI'] == '/admin/debug-result') {
                static::$active = false;
            }
            if (static::$active) {
                static::$modules = explode('|', $modules);
                static::$modules[] = 'always';
                static::$log = 'DEBUG FILE' . "\n========================\n\n";
            }
        }

        /**
         * Method set_debug
         *
         * @param bool $active [explicite description]
         *
         * @return void
         */
        public static function getLog()
        {
            return static::$log; 
        }

    }
}
