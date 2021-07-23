<?php
namespace App {

    require_once 'Exceptions.php';

    class ExceptionHandler
    {
        public static function printException($e)
        {
            print 'Exception non capturée : ' . get_class($e) . ', code: ' . $e->getCode() . "<br />Fichier : " . $e->getFile() . " - Ligne : " . $e->getLine() . "<br /> Message: " . htmlentities($e->getMessage()) . "\n";
        }

        public static function handleException($e)
        {
            if($e instanceof NotFoundException) {
                $controllerClass = '\Controllers\ErrorController';
                call_user_func(array(new $controllerClass(), 'notFound'));
            } else {
                self::printException($e);
            }
            
        }

        public static function handleError($errno, $errstr, $errfile, $errline, array $errcontex)
        {
            print('Erreur non capturée : ' . $errstr);
        }
    }

}
