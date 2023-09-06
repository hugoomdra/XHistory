chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({
        url: chrome.runtime.getURL("index.html")
    });
});

chrome.runtime.onInstalled.addListener(function () {

    chrome.storage.local.remove(['XHistory'], function () {
        console.log('XHistory removed');
    });

});