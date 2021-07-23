              <ul>
              <?php foreach(__('links') as $key=>$value) : ?>
              <li>
              <a href="<?= $value ?>"><?= $key ?></a>
              </li>
              <?php endforeach;?>
              </ul>