<table class="responsive-table">
    <?php  foreach (__('post') as $key => $value) : ?>
    <tr>
        <th style="vertical-align: top;"><?= $key ?></th>
        <td><?= nl2br(htmlspecialchars($value)) ?></td>
    </tr>
    <?php  endforeach; ?>
</table>