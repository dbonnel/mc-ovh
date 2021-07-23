<?php

function __inc($template, $vars = [])
{
    $view = $GLOBALS['app']->getView();
    foreach ($vars as $key => $value) {
        $view->set_var($key, $value);
    }
    include __DIR__ . '/templates/' . $template . '.tpl.php';
}

function __($key, $subkey = '')
{
    $view = $GLOBALS['app']->getView();
    return $view->get_var($key, $subkey);
}

function dbg($module='always', $value = '')
{
    Utils\Debug::logvar($module, $value);
}
// function __($key, $subkey = '')
// {
//     try {
//         if ($subkey == '') {
//             $result = $GLOBALS['tpl_vars'][$key];
//         } else {
//             $result = $GLOBALS['tpl_vars'][$key][$subkey];
//         }
//     } catch (Exception $e) {
//         $result = '';
//     }
//     return $result;
// }

function __t($key)
{
    return \App\Texts::getText($key);
}
