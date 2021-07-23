
            <?php if (array_key_exists('global', __('fields_errors'))): ?>
            <p class="field-error"><?=__('fields_errors')['global']?></p>
            <?php endif;?>
            <div class="row">
                <div class="login">
                    <h2 class="title">Se connecter</h2>
                    <p>Heureux de vous revoir! <br>Entrez votre mail et votre mot de passe pour vous connecter.</p>

                    <div class="login-register-form">
                        <form action="/login-register" method="POST">
                            <input type="hidden" name="log-token" value="<?=__('token');?>"/>
                            <input class="std-input<?=array_key_exists('log-mail', __('fields_errors')) ? ' error' : ''?>" name="log-mail"
                            <?=array_key_exists('log-mail', $_POST) ? (' value="' . $_POST['log-mail'] . '"') : ''?> type="email" placeholder="<?=__t('plh_email')?>">
                            <?php if (array_key_exists('log-mail', __('fields_errors'))): ?>
                            <p class="field-error"><?=__('fields_errors')['log-mail']?></p>
                            <?php endif;?>
                            <input class="std-input<?=array_key_exists('log-password', __('fields_errors')) ? ' error' : ''?>" name="log-password" type="password" placeholder="<?=__t('plh_pswd')?>">
                            <?php if (array_key_exists('log-password', __('fields_errors'))): ?>
                            <p class="field-error"><?=__('fields_errors')['log-password']?></p>
                            <?php endif;?>
                            <div class="checkbox-forgot">
                                <div class="color-checkbox">
                                    <input id="checkbox1" type="checkbox" name="log-remember">
                                    <label for="checkbox1"><span></span>Se souvenir de moi</label>
                                </div>
                                <a href="#">Mot de passe oublié ?</a>
                            </div>
                            <button name="btn-login" class="main-btn">Se connecter</button>
                        </form>
                    </div>
                </div>

                <div class="register">
                    <h2 class="title">Register</h2>
                    <p>Create new account today to reap the benefits of a personalized <br> shopping experience.</p>

                    <div class="login-register-form">
                        <form action="/login-register" method="POST">
                            <input type="hidden" name="reg-token" value="<?=__('token');?>"/>

                            <input class="std-input<?=array_key_exists('reg-mail', __('fields_errors')) ? ' error' : ''?>" name="reg-mail"
                            <?=array_key_exists('reg-mail', $_POST) ? (' value="' . $_POST['reg-mail'] . '"') : ''?> type="email" placeholder="<?=__t('plh_email')?>">
                            <?php if (array_key_exists('reg-mail', __('fields_errors'))): ?>
                            <p class="field-error"><?=__('fields_errors')['reg-mail']?></p>
                            <?php endif;?>
                            <input class="std-input<?=array_key_exists('reg-password', __('fields_errors')) ? ' error' : ''?>" name="reg-password" type="password" placeholder="<?=__t('plh_pswd')?>">
                            <?php if (array_key_exists('reg-password', __('fields_errors'))): ?>
                            <p class="field-error"><?=__('fields_errors')['reg-password']?></p>
                            <?php endif;?>
                            <input class="std-input<?=array_key_exists('reg-confirm-password', __('fields_errors')) ? ' error' : ''?>" name="reg-confirm-password" type="password" placeholder="<?=__t('plh_confirm_pswd')?>">
                            <?php if (array_key_exists('reg-confirm-password', __('fields_errors'))): ?>
                            <p class="field-error"><?=__('fields_errors')['reg-confirm-password']?></p>
                            <?php endif;?>
                            <div class="policy-checkbox">
                                <div class="color-checkbox">
                                <input id="checkbox2" type="checkbox" name="accept-policy">
                                <label for="checkbox2"><span></span> I accept <a href="#">Term of Use</a> & <a
                                        href="#">Privacy Policy</a></label>
                                </div>

                            </div>
                            <?php if (array_key_exists('accept-policy', __('fields_errors'))): ?>
                            <p class="field-error"><?=__('fields_errors')['accept-policy']?></p>
                            <?php endif;?>
                            <button name="btn-register" class="main-btn">register now</button>
                        </form>
                    </div>
                </div>
            </div>
