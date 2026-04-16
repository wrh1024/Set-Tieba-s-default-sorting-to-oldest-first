// ==UserScript==
// @name         Tieba 正序点击
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  自动点击正序
// @match        https://tieba.baidu.com/*
// @match        https://tieba.baidu.com/p/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    let clicked = false;

    function clickElement() {
        if (clicked) return;
        const elements = document.querySelectorAll('.sub-tab-item');
        for (const el of elements) {
            if (el.textContent.trim() === '正序') {
                el.click();
                clicked = true;
                console.log('已点击正序');
                return;
            }
        }
    }

    function onPageChange() {
        clicked = false;
        setTimeout(clickElement, 1500);
        setTimeout(clickElement, 2500);
    }

    const observer = new MutationObserver(() => {
        if (!clicked) clickElement();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    const origPushState = history.pushState;
    const origReplaceState = history.replaceState;
    history.pushState = function() {
        origPushState.apply(this, arguments);
        onPageChange();
    };
    history.replaceState = function() {
        origReplaceState.apply(this, arguments);
        onPageChange();
    };
    window.addEventListener('popstate', onPageChange);

    setTimeout(clickElement, 1000);
    setTimeout(clickElement, 2000);
    setTimeout(clickElement, 3000);
})();
