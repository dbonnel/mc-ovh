<?php
namespace Views {
    class View
    {
        private $vars = array();

        /**
         * Method set_var
         *
         * @param $name $name [explicite description]
         * @param $value $value [explicite description]
         *
         * @return View
         */
        public function set_var($name, $value)
        {
            $this->vars[$name] = $value;
            return $this;
        }

        public function add_array_var(string $name, array $value)
        {
            if (!array_key_exists($name, $this->vars) || !is_array($this->vars[$name])) {
                $this->vars[$name] = [];
            }
            $this->vars[$name] = array_merge($this->vars[$name], $value);
            return $this;
        }
        /**
         * Method get_var
         *
         * @param string $name [explicite description]
         *
         * @return void
         */
        public function get_var(string $name, string $subkey = '')
        {
            if (array_key_exists($name, $this->vars)) {
                if ($subkey == '') {
                    return $this->vars[$name];
                } else {
                    return $this->vars[$name][$subkey] ?? '';
                }
            } else {
                return '';
            }
        }

        /**
         * Method get_all_vars
         *
         * @return void
         */
        public function get_all_vars()
        {
            return $this->vars;
        }

    }
}
