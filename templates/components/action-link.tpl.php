<?php // ======================= obsolete ==================== ?>
<?php if (__('action') == 'show'): ?>
<?php $icon = 'icon-zoom' ?>
<a class="link-icon <?= $icon ?>" href="/<?=__('line', 'category') ?>/<?= __('line', 'slug') ?>">
    <?php elseif (__('action') == 'edit'): ?>
    <?php $icon = 'icon-pen' ?>
    <a class="link-icon <?= $icon ?>" href="/admin/update-<?=__('type') ?>/<?= __('line', 'id')  ?>">
        <?php elseif (__('action') == 'delete'): ?>
        <?php $icon = 'icon-delete' ?>
        <a class="link-icon <?= $icon ?>" data-id="<?= __('line', 'id') ?>" data-type="<?=__('type') ?>">
            <?php elseif (__('action') == 'restore'): ?>
            <?php $icon = 'icon-restore' ?>
            <a class="link-icon <?= $icon ?>" data-id="<?= __('line', 'id') ?>" data-type="<?=__('type') ?>">
                <?php elseif (__('action') == 'read'): ?>
                <?php $icon = 'icon-gear' ?>
                <a class="link-icon <?= $icon ?>" href="/admin/read-<?=__('type') ?>/<?= __('line', 'id')  ?>">
                    <?php endif; ?>
                    <svg class="icon-1em">
                        <use href="/assets/img/icons.svg#<?= $icon ?>"></use>
                    </svg>
                </a>