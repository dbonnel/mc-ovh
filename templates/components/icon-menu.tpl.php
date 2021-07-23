
            <ul class="icon-menu no-puce">
                <?php foreach (__('actions-menu') as $action): ?>
                <li>
                    <a class="link-icon <?=$action['icon']?>" href="<?=$action['href']?>">
                        <svg class="icon-1em">
                            <use href="/assets/img/icons.svg#<?=$action['icon']?>"></use>
                        </svg>
                    </a>
                </li>
                <?php endforeach;?>
            </ul>
