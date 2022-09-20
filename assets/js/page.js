var s = document.createElement('script');
s.src = chrome.runtime.getURL('assets/js/inject.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
