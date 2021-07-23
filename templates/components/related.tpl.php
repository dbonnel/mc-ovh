
<?php foreach (__('sommaire') as $chapitre): ?>
            <section class="sommaire-chapitre">
            <h2><?=(__('type_sommaire') == 'global') ? $chapitre['cours']['title'] : 'Dans ce chapitre :'?></h2>
            <div class="related">
                <h3>Cours</h3>
                <ul>
                    <li><a href="/cours/<?=$chapitre['cours']['slug']?>/"
                            title="<?=$chapitre['cours']['title']?>"><?=$chapitre['cours']['title']?>
                        </a>
                    </li>
                </ul>
                <?php foreach (['exercices', 'qcm', 'methode', 'supplement', 'quiz', 'solver'] as $key): if (array_key_exists($key, $chapitre)): ?>
	                    <?php $categories = \Models\TaxonomyModel::getInstance()->get_taxonomy('categorie');?>
		                <h3><?=$categories[$key]['name']?></h3>
		                <ul>
		                    <?php foreach ($chapitre[$key] as $ligne): ?>
		                    <li>
		                    <?php if ($ligne['difficult'] > 0): ?>
		                    <svg class="icon-difficulte">
		                        <use href="/assets/img/icons.svg#icon-dif-<?=$ligne['difficult']?>"></use>
		                    </svg>
		                    <?php endif;?>
                    <a href="/<?=$key?>/<?=$ligne['slug']?>" title="<?=$ligne['title']?>"><?=$ligne['title']?></a>
                    </li>
                    <?php endforeach?>
                </ul>
                <?php endif;endforeach?>
            </div>
        </section>
<?php endforeach;?>
