<?php

/**
 * Fichier app\App.php
 *
 * Crée, initialise et exécute l'application
 * Crée les routes du site
 *
 * PHP version 7
 *
 * @package   MathsCours
 * @author    Didier Bonnel <dbonnel@gmail.com>
 * @copyright 2020 Didier Bonnel
 * @version   1.0.0
 * @since     1.0.0
 */

namespace App {
    /**
     * App
     * Crée, initialise et exécute l'application
     * Crée les routes du site
     *
     * @version   Release: 1.0.0
     * @since     1.0.0
     */
    class App
    {
        private $routes = array();
        private $controller;

        /**
         * Method __construct
         *
         * @return void
         */
        public function __construct()
        {
            Config::init();
            Texts::init();
            Session::start();
        }

        /**
         * Method addRoutes
         *
         * @param string $controllerName nom du controller
         * @param array  $routes         Table des routes sous la forme
         *                               [$path => $fct]
         *
         * @return void
         */
        public function addRoutes(string $controllerName, array $routes)
        {
            foreach ($routes as $path => $fct) {
                if (substr($path, -1) == '*') {
                    array_push(
                        $this->routes,
                        array(
                            'path' => substr($path, 0, -1),
                            'ctrlr-name' => $controllerName . 'Controller',
                            'fct' => $fct,
                            'params' => true,
                        )
                    );
                } else {
                    array_push(
                        $this->routes,
                        array(
                            'path' => $path,
                            'ctrlr-name' => $controllerName . 'Controller',
                            'fct' => $fct,
                            'params' => false,
                        )
                    );
                }
            }
        }

        /**
         * Method exec
         *
         * @return void
         */
        public function exec()
        {
            dbg('routes', $this->routes);
           // print_r($this->routes);exit;
            $uri_items = explode("?", $_SERVER['REQUEST_URI']);
            $uri = $uri_items[0];
           // print_r($uri);exit;
            foreach ($this->routes as $route) {
                if ($route['params']) {
                    if ($route['path'] == substr($uri, 0, strlen($route['path']))) {
                      //  print_r($route['path']);
                        $controllerClass = '\\Controllers\\' . $route['ctrlr-name'];
                        $this->controller = new $controllerClass();
                        $params = explode(
                            '/',
                            trim(substr($uri, strlen($route['path'])), '/')
                        );
                        call_user_func(
                            array(
                                $this->controller,
                                $route['fct'],
                            ),
                            $params
                        );
                        return;
                    }
                } else {
                    if ($route['path'] == $uri) {
                        $controllerClass = '\\Controllers\\' . $route['ctrlr-name'];
                        $this->controller = new $controllerClass();
                        call_user_func(
                            array(
                                $this->controller,
                                $route['fct'],
                            )
                        );
                        return;
                    }
                }
            }
            
            throw new NotFoundException('Url non trouvée');
        }

        /**
         * Method getController
         *
         * @return void
         */
        public function getController()
        {
            return $this->controller;
        }

        /**
         * Method getView
         *
         * @return void
         */
        public function getView()
        {
            return $this->controller->view;
        }
    }
}
