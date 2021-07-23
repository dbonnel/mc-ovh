<table class="responsive-table">
    <thead>
        <tr>
            <?php foreach (__('table_headers') as $header => $key): ?>
            <th scope="col"><?=$header?></th>
            <?php endforeach;?>
            <th class="actions" scope="col">Actions</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach (__('table_content') as $line): ?>
        <tr>
            <?php foreach (__('table_headers') as $header => $key): ?>
            <td data-label="<?=$header?>"><?=$line[$key]?></td>
            <?php endforeach;?>
            <td data-label="Actions">
                <?php foreach ($line['actions'] as $action): ?>
                <a class="link-icon <?= $action['icon'] ?>" href="<?= $action['href'] ?>">
                    <svg class="icon-1em">
                        <use href="/assets/img/icons.svg#<?= $action['icon'] ?>"></use>
                    </svg>
                </a>
                <?php endforeach;?>
            </td>
        </tr>
        <?php endforeach;?>
    </tbody>
</table>