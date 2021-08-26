
<?php if (__('dev')): ?>
    <a href="<?= \App\Config::$prod_base_url.__('current_url') ?>" class="signal" style="position: fixed; top: 1.2rem; left: 1.2rem; width: 5rem;height: 5rem;border-radius: 2.5rem; background-color: #7dc246; z-index:1000"></a>
<?php elseif (__('is_administrator')) : ?>
    <a href="<?= \App\Config::$dev_base_url.__('current_url') ?>" class="signal" style="position: fixed; top: 1.2rem; left: 1.2rem; width: 5rem;height: 5rem;border-radius: 2.5rem; background-color: red; z-index:1000"></a>
<?php endif; ?>
