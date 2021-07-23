<?php
namespace Utils {
    class SqlRequest
    {
        private $action;
        private $fields = [];
        private $where = [];
        private $limit = '';
        private $order = [];
        private $table = '{table}';

        public function __construct($action = "SELECT")
        {
            $this->action = trim(strtoupper($action));
        }

        public function set_fields($fields)
        {
            $this->fields = $fields;
            return $this;
        }

        public function add_fields($fields)
        {
            $this->fields = array_merge($this->fields, $fields);
            return $this;
        }

        public function set_table($table)
        {
            $this->table = $table;
            return $this;
        }

/**
 * set_where
 *
 * @param [array] $where : exemple $where = 'champ' donne à 'champ = :champ'
 * @return $this
 */
        public function set_where(array $where)
        {
            foreach ($where as $key => $item) {
                $where[$key] = $where[$key] . ' = :' . $where[$key];
            }
            return $this->set_where_condition($where);
        }
/**
 * set_where_condition
 *
 * @param [array] $where : exemple $where = 'champ > :valeur'
 * @return $this
 */
        public function set_where_condition(array $where)
        {
            $this->where = $where;
            return $this;
        }

        public function add_where_condition(array $where)
        {
            $this->fields = array_merge($this->where, $where);
            return $this;
        }

        public function add_where(array $where)
        {
            foreach ($where as $key => $item) {
                $where[$key] = $where[$key] . ' = :' . $where[$key];
            }
            return $this->add_where_condition($where);
        }

        public function paginate($per_page)
        {
            $page = $_GET['page'] ?? 1;
            $this->limit = sprintf(" LIMIT %s OFFSET %s", $per_page, $per_page * ($page - 1));
            return $this;
        }

        public function set_order($order)
        {
            $this->order = $order;
            return $this;
        }
        public function add_order($order)
        {
            $this->order = array_merge($this->order, $order);
            return $this;
        }

        public function request()
        {

            if (count($this->where) > 0) {
                $where = ' WHERE ' . implode(' AND ', $this->where);
            } else {
                $where = '';
            }

            switch ($this->action) {
                case 'SELECT':
                    if (count($this->fields) > 0) {
                        $fields = implode(', ', $this->fields);
                    } else {
                        $fields = '*';
                    }
                    if (count($this->order) > 0) {
                        $order = ' ORDER BY ' . implode(', ', $this->order);
                    } else {
                        $order = '';
                    }
                    $result = sprintf("SELECT %s FROM %s %s %s %s", $fields, $this->table, $where, $order, $this->limit);
                    break;
                case 'INSERT':
                case 'REPLACE':
                    if (count($this->fields) > 0) {
                        $fields = implode(', ', $this->fields);
                        $values = ':' . implode(', :', $this->fields);
                    } else {
                        //TODO: error
                    }
                    $result = sprintf($this->action . " INTO %s (%s) VALUES (%s)", $this->table, $fields, $values);
                    break;
                case 'UPDATE':
                    if (count($this->fields) > 0) {
                        $assign = [];
                        foreach ($this->fields as $value) {
                            {
                                $assign[] = $value . ' = :' . $value;
                            }
                        }
                        $assign = implode(', ', $assign);
                    } else {
                        //TODO: error
                    }
                    $result = sprintf("UPDATE %s SET %s %s", $this->table, $assign, $where);
                    break;
            }
            $this->table = '{table}';
            return $result;
        }

    }
}
