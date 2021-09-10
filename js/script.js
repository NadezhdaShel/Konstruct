
//Menu
const SELECTOR_NAV_MINI = '.nav__mini';
const SELECTOR_NAV_LIST = '.nav__list';
const CLASS_NAV_ACTIVE = 'active';
const SELECTOR_NAVBAR = '.navbar';
const SELECTOR_BUTTON_SCROLL = '.header__foot';

var navMini = document.querySelector(SELECTOR_NAV_MINI);
var navList = document.querySelector(SELECTOR_NAV_LIST);
var navbar = document.querySelector(SELECTOR_NAVBAR);
var headerScroll = document.querySelector(SELECTOR_BUTTON_SCROLL);
//Mini menu
if ((navMini != null) && (navList != null)) {
    navMini.addEventListener('click', clickMiniMenu);
}
function clickMiniMenu() {
    if (navMini.classList.contains(CLASS_NAV_ACTIVE)) {
        navMini.classList.remove(CLASS_NAV_ACTIVE);
        navList.classList.remove(CLASS_NAV_ACTIVE);
        document.body.style.overflow = "auto";

    } else {
        navMini.classList.add(CLASS_NAV_ACTIVE);
        navList.classList.add(CLASS_NAV_ACTIVE);
        document.body.style.overflow = "hidden";
        if (navbar != null) {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if (Math.max(document.documentElement.scrollTop, document.body.scrollTop) != navbar.getBoundingClientRect().top + scrollTop) {
                var coordY = navbar.getBoundingClientRect().top + scrollTop;
                scrollToSection(coordY, 200, 0);
            }
        }
    }

}

//Click on scroll
if ((headerScroll != null) && (navbar != null)) {
    headerScroll.addEventListener('click', function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var coordY = navbar.getBoundingClientRect().top + scrollTop;
        scrollToSection(coordY, 200, 0);
    })

    //Slowly scroll
    function scrollToSection(targetScroll, duration, durationI) {
        if (duration <= 0) return;
        var difference = targetScroll - Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        var perTick = difference / duration * 10;
        setTimeout(function () {
            document.documentElement.scrollTop = document.documentElement.scrollTop + perTick;
            document.body.scrollTop = document.body.scrollTop + perTick;
            if (Math.max(document.documentElement.scrollTop, document.body.scrollTop) === targetScroll) return;
            scrollToSection(targetScroll, duration - 10, 10);
        }, durationI);
    }

}
//Change font size
const SELECTOR_ITEM_TITLE = '.our-story__item-title';
var itemTitles = document.querySelectorAll(SELECTOR_ITEM_TITLE);
const maxFontSize = 40;
const normalFontSize = 24;
const imageWidth = 140;
if (itemTitles.length > 0) {
    ChangeFontSize();
    window.addEventListener('resize', ChangeFontSize);
    function ChangeFontSize() {
        for (i = 0; i < itemTitles.length; i++) {
            var parentBlock = itemTitles[i].parentNode;
            var parentWidth = parentBlock.clientWidth - window.getComputedStyle(itemTitles[i]).paddingLeft.replace('px', '') - window.getComputedStyle(itemTitles[i]).paddingRight.replace('px', '');
            var coef = normalFontSize / imageWidth;
            var textFontSize = coef * parentWidth;
            if (textFontSize > maxFontSize) {
                itemTitles[i].style.fontSize = maxFontSize + 'px';
            } else {
                itemTitles[i].style.fontSize = textFontSize + 'px';
            }
        }
    }
}
