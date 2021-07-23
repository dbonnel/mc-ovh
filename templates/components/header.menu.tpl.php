<nav class="site-navigation">
    <ul class="<?=__('direction')?>">
        <li><a href="/">Accueil</a></li>
        <li><a href="/classe/troisieme">Troisième</a></li>
        <li><a href="/classe/seconde">Seconde</a></li>
        <li><a href="/classe/premiere">Première</a></li>
        <li class="has-children">
            <a href="#">Terminale</a>
            <ul class="sub-menu">
                <li><a href="/classe/terminale">Terminale - spé</a></li>
                <li><a href="/classe/tle-expert">Terminale - expertes</a></li>
                <li><a href="/classe/tle-complementaire">Terminale - complém.</a></li>
            </ul>
        </li>
        <li class="has-children">
            <a href="#">Annales</a>
            <ul class="sub-menu">
                <li><a href="/annales/brevet">Brevet</a></li>
                <li><a href="/annales/1ere">Contrôles 1ère</a></li>
                <li><a href="/annales/bac-s">Bac S</a></li>
                <li><a href="/annales/bac-es">Bac ES/L</a></li>
                <li><a href="/annales/enigme">Énigmes</a></li>
            </ul>
        </li>
        <?php if (__('user', 'role') == 'admin'): ?>
        <li><a href="/admin/posts/list">Admin</a></li>
        <li><a href="/admin/debug-result">Debug</a></li>
        <?php endif?>
    </ul>
</nav>