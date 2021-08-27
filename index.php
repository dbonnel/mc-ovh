<?php

/**
 * Fichier index.php
 *
 * Crée, initialise et exécute l'application
 * Crée les routes du site
 *
 * PHP version 7
 *
 * @category  CategoryName
 * @package   MathsCours
 * @author    Didier Bonnel <dbonnel@gmail.com>
 * @copyright 2020 Didier Bonnel
 * @license   https://www.apache.org/licenses/LICENSE-2.0.txt  Apache-2.0
 * @version   GIT: 1.0.0
 * @link      http://newmc.test/
 * @since     1.0.0
 */

ini_set('display_errors', 1);
require_once 'utils/Autoloader.php';

require_once 'helpers.php';

Utils\Autoloader::register();

// Utils\Debug::set_debug('sommaire|routes');
Utils\Debug::set_debug();

date_default_timezone_set('Europe/Paris');

dbg('always', date("d-m-Y H:i:s"));
$app = new App\App;
$GLOBALS['app'] = $app;

set_exception_handler('\app\ExceptionHandler::handleException');

$app->addRoutes(
    'User', [
        '/login-register' => 'login_register',
        '/confirm-mail' => 'confirm_mail_address',
        '/member/profile' => 'profile_show',
        '/member/logout' => 'logout',
    ]
);

$app->addRoutes(
    'Post', [
        '/' => 'home',
        '/annales/*' => 'annales',
        '/classe/*' => 'sommaire',
        '/exercices/*' => 'showExercices',
        '/page/*' => 'showPages',
        '/cours/*' => 'showCours',
        '/methode/*' => 'showMethode',
        '/enigme/*' => 'showEnigme',
        '/qcm/*' => 'showQcm',
        '/supplement/*' => 'showSupplement',
    ]
);

$app->addRoutes(
    'Tool', [
        '/solver/*' => 'solver',
    ]
);

$app->addRoutes(
    'System',
    [
        '/autolog' => 'autolog',
    ]
);

if (\App\Session::is_administrator()) {
    $app->addRoutes(
        'User', [
            '/admin/delete-user/*' => 'delete',
            '/admin/restore-user/*' => 'restore',
            // '/admin/update-user/*' => 'update_get',
            //$app->add_post_routes( '/admin/update-user/*' => 'update_post',
            '/admin/users/list' => 'listUsers',
            '/admin/users/list/*' => 'listUsers',
        ]
    );

    $app->addRoutes(
        'Post', [
            '/admin/create-post' => 'editPost',
            '/admin/update-post/*' => 'editPost',
            '/admin/delete-post/*' => 'delete',
            '/admin/restore-post/*' => 'restore',
            '/admin/batch-post' => 'batch',
            '/admin/read-post/*' => 'read',
            '/admin/posts/list' => 'listPosts',
            '/admin/posts/list/*' => 'listPosts',
            '/admin/transform-post/*' => 'transform',
            '/admin/posts/upload-by-id/*' => 'upload_by_id',
            '/admin/posts/get-uploaded-by-id/*' => 'get_uploaded_by_id',
            '/admin/posts/bulk/*' => 'bulk',
            '/ajax/get-psimg' => 'ajaxGetPsimg',
            '/ajax/get-post/*' => 'ajaxGetPost',
            '/ajax/file-rw' => 'ajaxFileRW',
        ]
    );

    $app->addRoutes(
        'System', [
            '/admin/db-backup' => 'dbBackup',
            '/admin/db-restore' => 'dbRestore',
            '/admin/db-transfert' => 'ftpTransfertDB',
            '/admin/pull-prod' => 'pullProduction',
            '/admin/push-git' => 'pushGithub',
            '/admin/ftp-transfert' => 'ftpTransfert',
            //  '/admin/ftp-upload' => 'ftpUpload',
            //  '/admin/ftp-download' => 'ftpDownload',
            '/admin/ftp-diff' => 'ftpDiff',
            '/admin/debug-result' => 'getDebug',
            '/admin/batch-js' => 'batchJs',
            '/admin/test' => 'test',
            '/admin/post-backup/*' => 'postBackup',
            '/admin/post-restore' => 'postRestore',
        ]
    );
}

$app->exec();
