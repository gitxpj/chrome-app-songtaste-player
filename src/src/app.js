/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('res/index.html', {
        "id": "SongTastePlayer",
        "minWidth": 495,
        "minHeight": 476,
        "maxWidth": 495,
        "maxHeight": 476,
        "singleton": true,
        "frame": "none"
    });

    chrome.contextMenus.create({
        type: "normal",
        id: "RefreshList",
        title: "刷新列表",
        contexts: ["all"]
    });

    chrome.contextMenus.create({
        type: "normal",
        id: "DownloadMusic",
        title: "下载音乐",
        contexts: ["all"]
    });

    chrome.contextMenus.create({
        type: "normal",
        id: "MiniWindow",
        title: "最小化",
        contexts: ["all"]
    });

    chrome.contextMenus.create({
        type: "normal",
        id: "CloseWindow",
        title: "关闭",
        contexts: ["all"]
    });

    chrome.contextMenus.create({
        type: "normal",
        id: "Copyright",
        title: "Author 5L丶",
        contexts: ["all"]
    });
});
//function addExternalMessageListener