<?php
namespace Views {
    class MailView extends View
    {

        public function send($template)
        {

            $GLOBALS['tpl_vars'] = $this->get_all_vars();

            // Include the helpers file
            include_once 'helpers.php';

            ob_start();
            // Include the template file
            include dirname(__DIR__) . '/templates/' . $template . '.tpl.php';
            $body = ob_get_contents();
            ob_end_clean();

            mail($this->get_var('send_to'), $this->get_var('subject'), $body, $this->get_var('headers'));

        }

    }
}
