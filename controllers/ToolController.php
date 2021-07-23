<?php

/**
 * Fichier app\ToolController.php
 *
 * Contrôleur des Outils de l'application
 *
 * PHP version 7
 *
 * @package   MathsCours
 * @author    Didier Bonnel <dbonnel@gmail.com>
 * @copyright 2020 Didier Bonnel
 * @version   1.0.0
 * @since     1.0.0
 */

namespace Controllers {

    /**
     * ToolControllers
     *
     *  Contrôleur des Outils de l'application
     *
     *
     * @version   Release: 1.0.0
     * @since     1.0.0
     */
    class ToolController extends Controller
    {
        public function __construct()
        {
            parent::__construct();

        }

        public function solver($params)
        {
            $slug = $params[0];
            switch ($slug) {
                case 'outil-equation-du-2nd-degre':
                    $this->solver_2nd_degre();
                    break;
                case 'algorithme-euclide':
                    $this->solver_algorithme_euclide();
                    break;
                    case 'coefficients-bezout':
                        $this->solver_coefficients_bezout();
                        break;
                default:
                    throw new \App\NotFoundException('Outil inexistant');
            }

        }
        public function solver_2nd_degre()
        {
            $result = '';
            if (array_key_exists('a', $_GET) && array_key_exists('b', $_GET) && array_key_exists('c', $_GET)) {
                $model = new \Models\ToolModel();
                $result = $model->second_degre($_GET);
            }
            $this->view->set_var('page_title', 'Outil équation du 2nd degré')
                ->set_var('result', $result)
                ->set_var('a', array_key_exists('a', $_GET) ? $_GET['a'] : '1')
                ->set_var('b', array_key_exists('b', $_GET) ? $_GET['b'] : '2')
                ->set_var('c', array_key_exists('c', $_GET) ? $_GET['c'] : '-3')
                ->set_var('content_tpl', 'pages-outils/outil-second-degre')
                ->add_array_var('jsfile', ['katex.min.js', 'mckatex.js'])          
                ->show('main');
        }
        public function solver_algorithme_euclide()
        {
            $result = '';
            if (array_key_exists('a', $_GET) && array_key_exists('b', $_GET) ) {
                $model = new \Models\ToolModel();
                $result = $model->algorithme_euclide($_GET);
            }
            $this->view->set_var('page_title', 'Outil Algorithme d\'Euclide')
                ->set_var('result', $result )
                ->set_var('a', array_key_exists('a', $_GET) ? $_GET['a'] : '120')
                ->set_var('b', array_key_exists('b', $_GET) ? $_GET['b'] : '165')
                ->set_var('content_tpl', 'pages-outils/outil-algorithme-euclide')
                ->show('main');
        }

        public function solver_coefficients_bezout()
        {
            $result = '';
            if (array_key_exists('a', $_GET) && array_key_exists('b', $_GET) ) {
                $model = new \Models\ToolModel();
                $result = $model->coefficients_bezout($_GET);
            }
            $this->view->set_var('page_title', 'Outil : Th. de Bézout - Calcul des coefficients')
                ->set_var('result', $result )
                ->set_var('a', array_key_exists('a', $_GET) ? $_GET['a'] : '120')
                ->set_var('b', array_key_exists('b', $_GET) ? $_GET['b'] : '165')
                ->set_var('content_tpl', 'pages-outils/outil-coefficients-bezout')
                ->show('main');
        }

        public function bulk($params)
        {
            //  echo "ok"; exit;
            $slug = trim($params, "/");
            $post = $this->model->count_all([], 'all');
//  print_r($post); exit;
            $this->view->set_var('page_title', 'BULK')
                ->set_var('content', $post)
                ->show('main');
        }
    }

}
