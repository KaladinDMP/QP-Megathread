// Lightweight i18n for QP Megathread
// English is the default (hardcoded in HTML). Other languages load from /assets/locales/<lang>.json.
// If a key is missing from a translation file the English text in the HTML stays untouched.
(function () {
    var SUPPORTED = {
        en: { name: 'English',    flag: '\uD83C\uDDEC\uD83C\uDDE7' },
        es: { name: 'Español',    flag: '\uD83C\uDDEA\uD83C\uDDF8' },
        fr: { name: 'Français',   flag: '\uD83C\uDDEB\uD83C\uDDF7' },
        de: { name: 'Deutsch',    flag: '\uD83C\uDDE9\uD83C\uDDEA' },
        pt: { name: 'Português',  flag: '\uD83C\uDDE7\uD83C\uDDF7' }
    };

    var STORAGE_KEY = 'qp-lang';

    // Detect whether we are inside /pages/ so we can resolve the locale path
    function basePath() {
        return window.location.pathname.indexOf('/pages/') !== -1 ? '../' : '';
    }

    function getLang() {
        var stored = localStorage.getItem(STORAGE_KEY);
        return stored && SUPPORTED[stored] ? stored : 'en';
    }

    function setLang(code) {
        localStorage.setItem(STORAGE_KEY, code);
    }

    // ---- Load & apply translations ----

    function loadAndApply(lang) {
        if (lang === 'en') return;                       // nothing to swap
        var url = basePath() + 'assets/locales/' + lang + '.json';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                try { apply(JSON.parse(xhr.responseText)); } catch (_) { /* bad JSON – ignore */ }
            }
        };
        xhr.send();
    }

    function apply(t) {
        // data-i18n  → textContent replacement
        var els = document.querySelectorAll('[data-i18n]');
        for (var i = 0; i < els.length; i++) {
            var key = els[i].getAttribute('data-i18n');
            if (t[key]) els[i].textContent = t[key];
        }
        // data-i18n-html → innerHTML replacement (for strings containing markup)
        var htmlEls = document.querySelectorAll('[data-i18n-html]');
        for (var j = 0; j < htmlEls.length; j++) {
            var hkey = htmlEls[j].getAttribute('data-i18n-html');
            if (t[hkey]) htmlEls[j].innerHTML = t[hkey];
        }
    }

    // ---- Language selector UI ----

    function buildSelector() {
        var lang = getLang();
        var info = SUPPORTED[lang];

        var wrap = document.createElement('div');
        wrap.className = 'lang-selector';

        var btn = document.createElement('button');
        btn.className = 'lang-btn';
        btn.setAttribute('aria-label', 'Select language');
        btn.innerHTML = info.flag + ' <span class="lang-code">' + lang.toUpperCase() + '</span>';

        var menu = document.createElement('div');
        menu.className = 'lang-dropdown';

        var codes = Object.keys(SUPPORTED);
        for (var i = 0; i < codes.length; i++) {
            (function (code) {
                var s = SUPPORTED[code];
                var opt = document.createElement('button');
                opt.className = 'lang-option' + (code === lang ? ' active' : '');
                opt.textContent = s.flag + '  ' + s.name;
                opt.addEventListener('click', function () {
                    setLang(code);
                    location.reload();
                });
                menu.appendChild(opt);
            })(codes[i]);
        }

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            wrap.classList.toggle('open');
        });

        document.addEventListener('click', function () {
            wrap.classList.remove('open');
        });

        wrap.appendChild(btn);
        wrap.appendChild(menu);

        // Insert after .nav-links (right side of navbar)
        var nav = document.querySelector('.nav-links');
        if (nav && nav.parentNode) {
            nav.parentNode.insertBefore(wrap, nav.nextSibling);
        }
    }

    // ---- Init ----

    function init() {
        buildSelector();
        var lang = getLang();
        if (lang !== 'en') {
            document.documentElement.lang = lang;
            loadAndApply(lang);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
