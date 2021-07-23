<!doctype html>
<html lang="fr">

<?php __inc('base/head')?>

<?php __inc('base/header')?>

<main class="container std-layout">
    <article class="content">
        <?php if(__('actions-menu')) : ?>
            <?php __inc('components/icon-menu'); ?>
        <?php endif; ?>        
        <div class="headline">
            <h1><?=__('page_title')?></h1>
        </div>
        <?= __('content_tpl')?__inc(__('content_tpl')):__('content') ?>
    </article>
    <?php __inc('base/aside')?>
</main>
</section>

<?php if(__('popup')): ?>
<?php __inc('components/popup', ['popup_name' => __('popup')])?>
<?php endif; ?>

<?php __inc('base/footer')?>

</html>