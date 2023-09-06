
function tweetRefresh(storage) {

    $('#container').html('');

    if (storage.length > 0) {
        storage.forEach((element, index) => {

            console.log('element', element);

            $('#container').append(`
            <div class="card">
                <button data-id="${element.date}" class="btn-trash">
                    <svg style="width: 20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
                    </svg>
                </button>

                <div class="card-header">
                    <div class="card-account">
                        <img src="${element.accountAvatar}" class="card-avatar">
                        ${element.account}
                    </div>
                    <div class="card-date">
                        <svg style="width: 15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                            <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" />
                        </svg>

                        ${new Date(element.date).toLocaleString()}
                    </div>
                </div>

                <div class="card-tweet">${element.html}</div>

                <div class="card-footer">
                    <a href="${element.url}" target="_blank" class="btn btn-go">Voir le tweet</a>
                </div>
            
            </div>`);

            $(`.btn-trash`).click(function () {

                // remove element index from storage
                let id = $(this).data('id');

                let newStorageArray = storage.filter(function (tweet) {
                    return tweet.date != id;
                });

                chrome.storage.local.set({
                    XHistory: newStorageArray
                }, function () {
                    tweetRefresh(newStorageArray);
                });

            });

        });
    }else{
        $('#container').html('<p style="font-size: 15px; padding-top: 300px;">No history available</p>');
    }

}

init = async function () {

    let storage = await chrome.storage.local.get(['XHistory']);
    storage.XHistory.reverse();
    

    tweetRefresh(storage.XHistory);
}

init();