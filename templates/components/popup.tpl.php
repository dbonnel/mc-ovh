<?php $popup = __('popup_name') ?>
<div id="<?= $popup['popup_id'] ?>" class="popup">
    <a class="popup-btn-close">&times;</a>
    <h3><?= $popup['popup_title'] ?></h3>
    <p><?= $popup['popup_message'] ?></p>
    <?php $buttons = $popup['popup_buttons']; ?>
    <?php if($buttons) : ?>
    <div class="buttons">
        <?php foreach($buttons as $label => $attr) : ?>
        <a <?= array_key_exists('class', $attr)? ' class="'.$attr['class'].'"':'' ?>
            <?= array_key_exists('id', $attr)? ' id="'.$attr['id'].'"':'' ?>
            <?= array_key_exists('href', $attr)? ' href="'.$attr['href'].'"':'' ?>
        ><?= $label?></a>
        <?php endforeach; ?>
    <?php endif; ?>
    </div>
</div>
<a class="popup-overlay"></a>