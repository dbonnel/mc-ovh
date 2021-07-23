<?php
namespace Utils {
    class Autoloader
    {
        public static function register()
        {
            spl_autoload_register(array(__CLASS__, 'autoload'));
        }

        public static function autoload($class)
        {
            // TODO: create debug : echo $class.'<br>';
            $classes = explode('\\', $class);
            for ($i = 0; $i < count($classes) - 1; $i++) {
                $classes[0] = strtolower($classes[0]);
            }
            $class = implode('/', $classes) . '.php';
            require $class;
        }

    }
}
