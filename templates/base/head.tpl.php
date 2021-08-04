<head>
    <meta charset="utf-8">

    <!--====== Title ======-->
    <title>
        <?=__('title')?>
    </title>
    <meta name="description" content="">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->

    <!--====== Favicon Icon ======-->
    <link rel="shortcut icon" href="/assets/img/favicon.ico" type="image/x-icon">

    <!--======  Style CSS ======-->
    <link rel="stylesheet" href="/assets/css/styles.css">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500&display=swap" rel="stylesheet">

</head>

<body class="<?=__('admin_page') ? 'admin' : 'front'?>">

<?php if (__('top_note')): ?>
<div>
<input type="checkbox" class="cb-top-note" id="cb-top-note" name="cb-top-note" checked>
<label for="cb-top-note" class="top-note">
<?=__('top_note')?><span>&times;</span>
</label>
</div>
<?php endif;?>