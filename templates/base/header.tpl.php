    <!--====== Header Start ======-->

    <header class="header-area">
        <div class="header-main">
            <div class="container">
                <div class="header-main-wrapper">
                    <a href="/">
                        <img class="custom-logo" src="/assets/img/logo.svg" alt="logo maths-cours">
                        <h1>Maths-cours</h1>
                    </a>

                </div>
            </div>
        </div>
    </header>

    <!--====== Header Ends ======-->

    <!--====== Header Desktop Menu Start ======-->

    <div class="header-menu">
        <div class="container">
            <div class="header-menu-inner">
                <?php __inc('components/' . (__('admin_page') ? 'header.admin-menu' : 'header.menu'), ['direction' => 'h-menu'])?>
                <?php if (\App\Session::is_administrator()): ?>
                <div class="header-login-register">
                    <ul class="login-register">
                        <li><a  class="login-register-btn" href="<?=__('link_login')?>">
                                    <svg role="img" width="21" height="22" viewBox="0 0 21 22">
                                        <title>User</title>
                                        <g stroke-width="2" stroke-miterlimit="10" fill="none">
                                            <path d="M7.1 12.2c-3.3 1.3-5.6 4.3-5.6 8.3h17.9c0-4-2.3-7-5.6-8.3"></path>
                                            <circle cx="10.5" cy="7.1" r="5.6"></circle>
                                        </g>
                                    </svg>
                                <?=__('text_login')?>
                        </a></li>
                        <?php if (\App\Config::$is_dev): ?>
                        <li><a id="fullscreen" class="transparent-small-btn">
                        <span style="font-size: 1.4em; padding-bottom: 3px">&harr;</span>
                        </a></li>
                        <?php endif?>
                    </ul>
                </div>
                <?php endif?>
            </div>
        </div>
    </div>

    <!--====== Header Desktop Menu Ends ======-->

    <!--====== Header Mobile menu Start ======-->

    <div class="header-mobile-menu">
        <div class="container">
            <div class="header-mobile-wrapper">
                <div class="header-mobile-logo">
                    <a href="/">
                    <img class="custom-logo" src="/assets/img/logo<?=__('admin') ? "-admin" : ""?>.svg" alt="logo maths cours">
                    <h1>Maths-cours</h1>
                    </a>
                </div>
                <ul class="header-mobile-meta">
                    <li>
                        <a href="/login-register">

                            <svg role="img" width="21" height="22" viewBox="0 0 21 22">
                                <title>User</title>
                                <g stroke-width="2" stroke-miterlimit="10" fill="none">
                                    <path d="M7.1 12.2c-3.3 1.3-5.6 4.3-5.6 8.3h17.9c0-4-2.3-7-5.6-8.3"></path>
                                    <circle cx="10.5" cy="7.1" r="5.6"></circle>
                                </g>
                            </svg>

                        </a>
                    </li>
                    <li>
                        <a id="navbar-mobile-open" href="javascript:;">

                            <svg role="img" viewBox="0 0 96 96" x="0px" y="0px">
                                <title>Menu</title>
                                <g>
                                <path d="M2,18c0-2.2,1.8-4,4-4h84c2.2,0,4,1.8,4,4s-1.8,4-4,4H6C3.8,22,2,20.2,2,18z M6,52h84c2.2,0,4-1.8,4-4s-1.8-4-4-4H6c-2.2,0-4,1.8-4,4S3.8,52,6,52z M6,82h84c2.2,0,4-1.8,4-4s-1.8-4-4-4H6c-2.2,0-4,1.8-4,4S3.8,82,6,82z"/>
                                </g>
                            </svg>

                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div id="mobile-navigation" class="mobile-nav">
            <a href="javascript:;" id="close-navbar-mobile" class="close-navbar-mobile">
            <svg role="img" viewBox="0 0 612 612" x="0px" y="0px">
                                <title>Close</title>
                                <g>
                                <polygon points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5"/>
                                </g>
                            </svg>
            </a>
            <?php __inc('components/' . (__('admin') ? 'header.admin-menu' : 'header.menu'), ['direction' => 'v-menu'])?>
        </div>
    </div>


    <!--====== Header Mobile menu Ends ======-->