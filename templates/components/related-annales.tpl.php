    <?php foreach (__('sommaire_annale') as $annee => $sujets): ?>
        <section class="sommaire-chapitre">
            <h2><?= (__('type_sommaire')=='global')?('Année ' . $sujets[0]['annale_annee']) : 'Autres exercices de ce sujet :' ?>
                </h2>
            <div class="related">
            <?php $lieu = '';?>
            <?php foreach ($sujets as $sujet): ?>
            <?php if ($sujet['annale_lieu'] != $lieu): ?>
                <?php if ($lieu != '') : ?>
                    </ul>
                <?php endif;?>
                <?php if (__('type_sommaire') == 'global' && $sujet['annale_lieu'] != 'no-annale') : ?>
                    <h3><?=$sujet['annale_lieu']?></h3>
                <?php endif;?>
                <ul>
            <?php endif?>
            <?php $lieu = $sujet['annale_lieu']?>
            <li>
                <?php if ($sujet['difficult'] > 0): ?>
                <svg class="icon-difficulte">
                    <use href="/assets/img/icons.svg#icon-dif-<?=$sujet['difficult']?>"></use>
                </svg>
            <?php endif;?>
                <a href="/<?=$sujet['category']?>/<?=$sujet['slug']?>" title="<?=$sujet['title']?>"><?=$sujet['title']?></a>
            </li>
            <?php endforeach;?>
            </ul>
        </div>
       </section>
    <?php endforeach;?>