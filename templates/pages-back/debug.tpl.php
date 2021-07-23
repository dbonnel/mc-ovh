<!doctype html>
<html lang="fr">

<?php __inc('base/head')?>

<html>

<?php
$debug = __('debug');
$items = explode('========================', $debug);
foreach ($items as $item):
    if (strpos($item, '\\controllers\\')) {
        $colors = "#900";
    } elseif (strpos($item, '\\views\\')) {
    $colors = "#090";
} elseif (strpos($item, '\\models\\')) {
    $colors = "#009";
} else {
    $colors = "#111";
}

?>
<pre style="font-weight: bold; color:<?=$colors?>; padding-bottom:1rem">
<?=trim($item)?>
</pre>
<?php
endforeach;
?>

</html>

