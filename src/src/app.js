/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('res/index.html', {
        "id": "SongTastePlayer",
        "minWidth": 475,
        "minHeight": 386,
        "maxWidth": 475,
        "maxHeight": 386,
        "singleton": true,
        "frame": "none"
    });

    chrome.contextMenus.create({
        type: "normal",
        id: "Refresh",
        title: "刷新列表",
        contexts: ["page"],
        onclick: function(info) {

        },
        documentUrlPatterns: ["*://" + chrome.runtime.id + "*"],
        targetUrlPatterns: ["*://" + chrome.runtime.id + "*"]
    });
});
//function addExternalMessageListener