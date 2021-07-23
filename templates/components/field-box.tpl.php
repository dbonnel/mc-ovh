<?php if(__('field_type') == 'hidden') : ?>
    <input  name="<?= __('field_name') ?>" id="<?= __('field_name') ?>" value="<?=  __('field_value') ?>"  type="hidden" />
<?php endif; ?>

<div class="field-box-<?=  __('field_format') ?><?= array_key_exists(__('field_name'), __('fields_errors')) ? ' error' : '' ?>">
    <label for="<?=  __('field_name') ?>" class="field-label"><?=  __('field_label') ?></label>

    <?php if(__('field_type') == 'text') : ?>
    <div id="<?= __('field_name') ?>"><?=  __('field_value') ?></div>

    <?php elseif(__('field_type') == 'input') : ?>
    <input  name="<?= __('field_name') ?>" id="<?= __('field_name') ?>" value="<?=  __('field_value') ?>"  type="text" placeholder="<?=__('field_placeholder') ?>" />

    <?php elseif(__('field_type') == 'select') : ?>
        <select name="<?= __('field_name') ?>" id="<?= __('field_name') ?>">
        <?php foreach( __('field_options') as $key => $option) : ?>
            <option value="<?= $key ?>"<?= __('field_value') == $key?'selected':'' ?>><?= $option ?></option>
        <?php endforeach; ?>
        </select>  

    <?php elseif(__('field_type') == 'textarea') : ?>
        <textarea name="<?= __('field_name') ?>" id="<?= __('field_name') ?>" rows="<?= __('field_rows') ?>"><?=  __('field_value') ?></textarea>
    <?php endif; ?>   

    <?php if (array_key_exists(__('field_name'), __('fields_errors'))): ?>
    <p class="field-error"><?= __('fields_errors')[__('field_name')] ?></p>
    <?php endif; ?>
</div>


