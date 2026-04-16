// ==UserScript==
// @name         Tieba 排序助手
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  自动选择贴吧帖子排序方式：正序、倒序或热门
// @match        https://tieba.baidu.com/*
// @match        https://tieba.baidu.com/p/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const SORT_OPTIONS = {
        'zhengxu': '正序',
        'daoxu': '倒序',
        'remen': '热门'
    };

    let currentSort = GM_getValue('tiebaSort', 'zhengxu');
    let clicked = false;

    function setSort(sortType) {
        GM_setValue('tiebaSort', sortType);
        currentSort = sortType;
        clicked = false;
        clickElement();
        alert('已设置为：' + SORT_OPTIONS[sortType]);
    }

    function registerMenu() {
        GM_registerMenuCommand('🔽 设置贴吧排序方式', () => {});

        for (const [key, name] of Object.entries(SORT_OPTIONS)) {
            const mark = currentSort === key ? ' ✅' : '';
            GM_registerMenuCommand(`  选择 ${name}${mark}`, () => setSort(key));
        }
    }

    function clickElement() {
        if (clicked) return;
        if (!document.querySelector('.sub-tab-item')) {
            return;
        }

        const elements = document.querySelectorAll('.sub-tab-item');
        const targetName = SORT_OPTIONS[currentSort];

        for (const el of elements) {
            if (el.textContent.trim() === targetName) {
                el.click();
                clicked = true;
                console.log('已点击：' + targetName);
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

    registerMenu();
    setTimeout(clickElement, 1000);
    setTimeout(clickElement, 2000);
    setTimeout(clickElement, 3000);
})();
