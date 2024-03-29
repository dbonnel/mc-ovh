 <!--====== Message popup Start ======-->
 <?php if (__('msg_popup')): ?>
 <div id="msg-popup" class="popup open">
     <a class="popup-btn-close">&times;</a>
     <h3><?=__('msg_popup', 'title')?></h3>
     <p><?=__('msg_popup', 'msg')?></p>
     <div class="buttons">
         <a id="popup-btn-cancel" class="popup-btn-cancel ok-btn">OK</a>
     </div>
 </div>
 <a class="popup-overlay"></a>
 <?php endif;?>
 <!--====== Message popup End ======-->

 <!--====== Footer Start ======-->

 <footer class="footer-area">
     <div class="container">
         <div class="footer-text-wrapper d-flex flex-wrap align-items-center justify-content-between">
             <div class="footer-copyright">
                 <p>Copyright <?=date('Y')?> &copy; <a href="/">Maths-cours.fr</a>. Tous droits réservés.
                 </p>
             </div>
         </div>
     </div>
     <?php __inc('components/debug')?>
 </footer>

 <!--====== Footer End ======-->
 <?=__('top_footer');?>
 <?php if (is_array(__('jsloadmodule'))): ?>
 <script>
let loadModule = ['<?=implode("', '", __('jsloadmodule'));?>']
 </script>
 <?php endif?>
 <?php if (is_array(__('jsfile'))): ?>
 <?php foreach (__('jsfile') as $jsfile): ?>
    <script src="/assets/js/<?=$jsfile?>"></script>
 <?php endforeach;?>
 <!-- Cookie Consent by https://www.CookieConsent.com -->
<script type="text/javascript" src="//www.cookieconsent.com/releases/4.0.0/cookie-consent.js" charset="UTF-8"></script>
<script type="text/javascript" charset="UTF-8">
document.addEventListener('DOMContentLoaded', function () {
cookieconsent.run({"notice_banner_type":"simple","consent_type":"express","palette":"light","language":"fr","page_load_consent_levels":["strictly-necessary"],"notice_banner_reject_button_hide":false,"preferences_center_close_button_hide":false,"website_name":"Maths-cours.fr","website_privacy_policy_url":"https://www.maths-cours.fr/page/cookies"});
});
</script>
<noscript>ePrivacy and GPDR Cookie Consent by <a href="https://www.CookieConsent.com/" rel="nofollow noopener">Cookie Consent</a></noscript>
<!-- End Cookie Consent by https://www.CookieConsent.com -->
 <?php endif?>