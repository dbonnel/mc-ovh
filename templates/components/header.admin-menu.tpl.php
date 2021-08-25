<nav class="site-navigation">
    <ul class="<?=__('direction')?>">
        <li><a href="/">Accueil</a></li>
        <li class="has-children">
            <a href="#" class="active">Posts</a>
            <ul class="sub-menu">
                <li><a href="/admin/posts/list">Liste des posts</a></li>
                <li><a href="/admin/create-post">Créer un post</a></li>
                <li><a href="/admin/posts/list/status/deleted">Corbeille</a></li>
            </ul>
        </li>
        <li class="has-children">
            <a href="#">Membres</a>
            <ul class="sub-menu">
                <li><a href="/admin/users/list">Liste des membres</a></li>
                <li><a href="/admin/users/list/status/deleted">Corbeille</a></li>
            </ul>
        </li>
        <li class="has-children">
            <a href="#">Système</a>

            <ul class="sub-menu">
                <li><a href="/admin/db-backup">Sauvegarde base</a></li>
                <li><a href="/admin/db-restore">Restauration base</a></li>
                <li><a href="/admin/pull-prod">Pull production</a></li>
                <li><a href="/admin/push-git">Push Github</a></li>
                <li><a href="/admin/batch-post">Batch</a></li>
            </ul>
        </li>
        <?php if (__('user', 'role') == 'admin'): ?>
        <li><a href="/admin/posts/list">Admin</a></li>
        <li><a href="/admin/debug-result">Debug</a></li>
        <?php endif?>
    </ul>
</nav>