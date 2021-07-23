 <!--====== Message popup Start ======-->
 <?php if (__('msg_popup')): ?>
 <div id="msg-popup" class="popup open">
     <a class="popup-btn-close">&times;</a>
     <h3><?=__('msg_popup', 'title') ?></h3>
     <p><?=__('msg_popup', 'msg') ?></p>
     <div class="buttons">
         <a id="popup-btn-cancel" class="popup-btn-cancel ok-btn">OK</a>
     </div>
 </div>
 <a class="popup-overlay"></a>
 <?php endif; ?>
 <!--====== Message popup End ======-->

 <!--====== Footer Start ======-->

 <footer class="footer-area">
     <div class="container">
         <div class="footer-text-wrapper d-flex flex-wrap align-items-center justify-content-between">
             <div class="footer-copyright">
                 <p>Copyright <?= date('Y') ?> &copy; <a href="/">Maths-cours.fr</a>. Tous droits réservés.
                 </p>
             </div>
         </div>
     </div>
     <?php __inc('components/debug')?>
 </footer>

 <!--====== Footer End ======-->
 <?= __('top_footer'); ?>
 <?php if(is_array(__('jsloadmodule'))) : ?>
 <script>
let loadModule = ['<?= implode("', '", __('jsloadmodule')); ?>']
 </script>
 <?php endif ?>
 <?php if(is_array(__('jsfile'))) : ?>
 <?php foreach(__('jsfile') as $jsfile) : ?>
 <script src="/assets/js/<?= $jsfile ?>"></script>
 <?php endforeach; ?>
 <?php endif ?>