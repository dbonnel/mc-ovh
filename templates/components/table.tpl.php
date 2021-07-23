
    <table class="responsive-table">
        <thead>
            <tr>
                <?php foreach (__('table_headers') as $header => $key): ?>
                <th scope="col"><?=$header ?></th>
                <?php endforeach; ?>
            </tr>
        </thead>
        <tbody>
            <?php foreach (__('table_content') as $line): ?>
            <tr>
                <?php foreach (__('table_headers') as $header => $key): ?>
                <td data-label="<?=$header ?>"><?=$line[$key] ?></td>
                <?php endforeach; ?>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
