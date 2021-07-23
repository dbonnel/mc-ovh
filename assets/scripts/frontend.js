/*=============================================
   =                Mobile Menu                  =
   =============================================*/

$id('navbar-mobile-open').addEventListener('click', function () {
    $id('mobile-navigation').classList.add('open');
});

$id('close-navbar-mobile').addEventListener('click', function () {
    $id('mobile-navigation').classList.remove('open');
});

const navSubMenu = $id('mobile-navigation').querySelectorAll('.has-children>a');
navSubMenu.forEach(function (el) {
    el.addEventListener('click', function (e) {
        navSubMenu.forEach(function (item) {
            item.parentElement.classList.remove('sub-open');
        });
        e.target.parentElement.classList.add('sub-open');
    })

});

/*=============================================
   =               Image minified                  =
   =============================================*/

$class('min-jpg').map(function (item) {
    // Start loading image
    const img = new Image();
    console.log(item);
    img.src = item.dataset.src;
    // Once image is loaded replace the src of the HTML element
    img.onload = function () {
        item.classList.remove('min-jpg');
        item.style.backgroundImage = 'url(' + item.dataset.src + ')';
    };
});


/*=============================================
   =              Table actions                =
   =============================================*/

$class("icon-delete").forEach(function (item) {
    item.addEventListener("click", function (e) {
        const id = e.currentTarget.getAttribute('data-id');
        const type = e.currentTarget.getAttribute('data-type');
        $id('popup-confirm').classList.add('open');
        $class("popup-btn-accept").forEach(function (el) {
            el.setAttribute("href", "/admin/delete-" + type + "/" + id);
        });
    });
});

$class("icon-restore").forEach(function (item) {
    item.addEventListener("click", function (e) {
        const id = e.currentTarget.getAttribute('data-id');
        const type = e.currentTarget.getAttribute('data-type');
        $id('popup-confirm').classList.add('open');
        $class("popup-btn-accept").forEach(function (el) {
            el.setAttribute("href", "/admin/restore-" + type + "/" + id);
        });
    });
});

/*=============================================
   =               Popup                  =
   =============================================*/

["popup-btn-close", "popup-overlay", "popup-btn-cancel"].forEach(function (className) {
    $class(className).forEach(function (item) {
        item.addEventListener("click", function (e) {
            $class("popup").forEach(function (item) {
                item.classList.remove('open');
            })
        });
    });
})

/*=============================================
   =                volet corrigé              =
   =============================================*/
$class("volet").forEach(function (item) {
    item.addEventListener("click", function (e) {
        e.currentTarget.classList.toggle('volet-open');
    });
});