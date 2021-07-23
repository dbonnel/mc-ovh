<?php
/**
 * Fichier app\PageController.php
 *
 * Contrôleur des pages isolées
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
         * PageController
         *
         * Contrôleur des pages isolées
         *
         * @version   Release: 1.0.0
         * @since     1.0.0
         */    
    class PageController extends Controller
    {        
        /**
         * Method home
         * Contrôleur de la pagz d'accueil
         *
         * @return void
         */
        public function home()
        {
            $this->view->set_var('content_tpl', 'pages-front/home')
            ->show('main');
        }
    }
}
