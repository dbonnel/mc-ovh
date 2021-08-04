<?php

namespace Controllers {
    class ErrorController extends Controller
    {
        public function notFound($e)
        {
            $this->view->show('pages-front/404');
        }
    }
}
