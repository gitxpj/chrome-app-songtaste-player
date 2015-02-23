var SongTaste = {
    site: "songtaste.chinacloudsites.cn",
    baseSite: "www.songtaste.com",
    getList: function(object) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "https://" + this.site + "/songtaste/list", true);
        xhr.responseType = 'application/json';
        xhr.onloadend = function(e) {
            var data = $.parseJSON(xhr.response);
            if (object.success && data.success) {
                object.success(data.array);
            } else {
                if (object.error)
                    object.error();
            }
        }
        xhr.onerror = function(e) {
            if (object.error)
                object.error();
        }
        xhr.send();
    },
    getDetails: function(object) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "https://" + this.site + "/songtaste/details?id=" + object.id, true);
        xhr.responseType = 'application/json';
        xhr.onloadend = function(e) {
            var data = $.parseJSON(xhr.response);
            if (object.success && data.success) {
                object.success(data.detail);
            } else {
                if (object.error)
                    object.error();
            }
        }
        xhr.onerror = function(e) {
            if (object.error)
                object.error();
        }
        xhr.send();
    },
    getPath: function(object) {

        var backUpRequest = function(obj) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', "https://" + SongTaste.site + "/songtaste/path?sid=" + object.id + "&hash=" + object.url_hash, true);
            xhr.responseType = 'application/json';
            xhr.onloadend = function(e) {
                var data = $.parseJSON(xhr.response);
                if (obj.success && data.success) {
                    obj.success(data);
                } else {
                    if (obj.error) {
                        obj.error();
                    }
                }
            }
            xhr.onerror = function(e) {
                if (obj.error)
                    obj.error();
            }
            xhr.send();
        }

        var xhr = new XMLHttpRequest();
        xhr.open('POST', "http://" + SongTaste.baseSite + "/time.php?p", true);
        xhr.responseType = 'text/html';
        xhr.onloadend = function(e) {
            var data = xhr.response;
            if (object.success && data.success) {
                object.success({
                    success: true,
                    play_path: data,
                    download_path: data.replace(/http:\/\/m/ig, "http://media")
                });
            } else {
                backUpRequest(object);
            }
        }
        xhr.onerror = function(e) {
            backUpRequest(object);
        }
        xhr.send("str=" + object.url_hash + "&sid" + object.id);
    }
}