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
    <!-- GA Google Analytics @ https://m0n.co/ga -->
		<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
			ga('create', 'UA-2007202-3', 'auto');
			ga('send', 'pageview');
		</script>

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