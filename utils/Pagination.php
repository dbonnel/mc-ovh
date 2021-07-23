<?php
namespace Utils {
    class Pagination
    {

        public $current_page;
        public $per_page;
        public $total_count;

        public function __construct($per_page = 20, $total_count = 0)
        {
            $this->current_page = $_GET['page'] ?? 1;
            $this->per_page = (int)$per_page;
            $this->total_count = (int)$total_count;
        }

        public function offset()
        {
            return $this->per_page * ($this->current_page - 1);
        }

        public function total_pages()
        {
            return ceil($this->total_count / $this->per_page);
        }

        public function previous_page()
        {
            $prev = $this->current_page - 1;
            return ($prev > 0) ? $prev : false;
        }

        public function next_page()
        {
            $next = $this->current_page + 1;
            return ($next <= $this->total_pages()) ? $next : false;
        }

        public function previous_link($url = "")
        {
            $link = "";
            if ($this->previous_page() != false) {
                $link .= "<a href=\"{$url}?page={$this->previous_page()}\">";
                $link .= "&laquo;</a>";
            }
            return $link;
        }

        public function next_link($url = "")
        {
            $link = "";
            if ($this->next_page() != false) {
                $link .= "<a href=\"{$url}?page={$this->next_page()}\">";
                $link .= "&raquo;</a>";
            }
            return $link;
        }

        public function number_links($url = "")
        {
            $output = "";
            $start = max(1, $this->current_page - 3);
            $end = min($this->total_pages(), $this->current_page + 3);

            for ($i = $start; $i <= $end; $i++) {
                if ($i == $this->current_page) {
                    $output .= "<span class=\"selected\">{$i}</span>";
                } else {
                    $output .= "<a href=\"{$url}?page={$i}\">{$i}</a>";
                }
            }
            return $output;
        }

        public function page_links()
        {
            $url_items = explode("?", $_SERVER['REQUEST_URI']);
            $url=$url_items[0];
            $output = "";
            if ($this->total_pages() > 1) {
                $output .= "<div class=\"pagination\">";
                $output .= $this->previous_link($url);
                $output .= $this->number_links($url);
                $output .= $this->next_link($url);
                $output .= "</div>";
            }
            return $output;
        }
    }
}
