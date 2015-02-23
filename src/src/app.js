chrome.contextMenus.create({
    type: "normal",
    id: "Refresh",
    title: "刷新列表",
    contexts: ["page"],
    onclick: function(info) {

    },
    documentUrlPatterns: ["*://" + chrome.runtime.id + "*"],
    targetUrlPatterns: ["*://" + chrome.runtime.id + "*"]
}, function() {

})

chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('res/index.html', {
        "id": "SongTastePlayer",
        "minWidth": 475,
        "minHeight": 354,
        "maxWidth": 475,
        "maxHeight": 354,
        "singleton": true,
        "frame": "none"
    }, function() {});
});