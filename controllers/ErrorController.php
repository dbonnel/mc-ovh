<?php

namespace Controllers {
    class ErrorController extends Controller
    {
        public function notFound()
        {
            $this->view->show('404');
        }
    }
}
