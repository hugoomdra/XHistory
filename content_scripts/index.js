console.log("content_scripts/index.js");

var previousUrl = '';

var observer = new MutationObserver(function (mutations) {

    if (location.href !== previousUrl && document.querySelector("article")) {
        previousUrl = location.href;

        if (location.href.includes('/status/')) {

            var tweet = $('article[data-testid="tweet"]').first()

            setTimeout(function () {
                var tweetHtml = tweet.find('div[data-testid="tweetText"]').html();
                var accountAvatar = tweet.find('.css-9pa8cd').attr('src');
                var tweetPhotos = tweet.find('div[data-testid="tweetPhoto"]')
                console.log('tweetPhotos', tweetPhotos);
                console.log('accountAvatar', accountAvatar);

                tweetPhotos = tweetPhotos.map(function () {
                    return $(this).find('img').attr('src').replace(/small/g, 'large');
                });

                chrome.storage.local.get(['XHistory'], function (storage) {
                    console.log('storage', storage);
    
                    if (storage.XHistory) {
    
                        storage.XHistory = storage.XHistory.filter(element => {
                            return element.url !== location.href;
                        });
    
                        storage.XHistory.push({
                            account: location.href.split('/')[3],
                            accountAvatar: accountAvatar,
                            html: tweetHtml,
                            photos: tweetPhotos,
                            date: Date.now(),
                            url: location.href
                        });
                    } else {
                        storage.XHistory = [{
                            account: location.href.split('/')[3],
                            accountAvatar: accountAvatar,
                            html: tweetHtml,
                            photos: tweetPhotos,
                            date: Date.now(),
                            url: location.href
                        }];
                    }
    
                    chrome.storage.local.set({ XHistory: storage.XHistory }, function () {
                        console.log('[XHistory] Tweet saved');
                    });
                });
                
            }, 100);

        } else (
            console.log("not match")
        )

    }

});

observer.observe(document, {
    childList: true,
    subtree: true
});