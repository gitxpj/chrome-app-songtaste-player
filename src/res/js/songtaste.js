var SongTaste = {
    site: "on1x.cn",
    baseSite: "www.songtaste.com",
    getList: function(object) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "http://" + this.site + "/songtaste/list", true);
        xhr.responseType = 'application/json';
        xhr.timeout = 5000;
        xhr.onloadend = function(e) {
            var data = $.parseJSON(xhr.response);
            if (object.success && data.err == 0) {
                object.success(data.songs);
            } else {
                if (object.error)
                    object.error();
            }
        }
        xhr.onerror = function(e) {
            if (object.error)
                object.error();
        }
        xhr.ontimeout = function(e) {
            if (object.timeout)
                object.timeout();
        }
        xhr.send();
    },
    getDetails: function(object) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "http://" + this.site + "/songtaste/details?id=" + object.id, true);
        xhr.responseType = 'application/json';
        xhr.timeout = 5000;
        xhr.onloadend = function(e) {
            var data = $.parseJSON(xhr.response);
            if (object.success && data.err == 0) {
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
        xhr.ontimeout = function(e) {
            if (object.timeout)
                object.timeout();
        }
        xhr.send();
    },
    getPath: function(object) {

        var obj = object;
        // var backUpRequest = function(obj) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "http://" + SongTaste.site + "/songtaste/path?sid=" + object.id + "&hash=" + object.url_hash, true);
        xhr.responseType = 'application/json';
        xhr.timeout = 5000;
        xhr.onloadend = function(e) {
            var data = $.parseJSON(xhr.response);
            if (obj.success && data.err == 0) {
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
        xhr.ontimeout = function(e) {
            if (obj.timeout)
                obj.timeout();
        }
        xhr.send();
        // }

        // var xhr = new XMLHttpRequest();
        // xhr.open('POST', "http://" + SongTaste.baseSite + "/time.php", true);
        // xhr.responseType = 'text/html';
        // xhr.timeout = 1000;
        // xhr.onloadend = function(e) {
        //     var data = xhr.response;
        //     if (object.success && data.success) {
        //         object.success({
        //             success: true,
        //             play_path: data,
        //             download_path: data.replace(/http:\/\/m/ig, "http://media")
        //         });
        //     } else {
        //         backUpRequest(object);
        //     }
        // }
        // xhr.onerror = function(e) {
        //     backUpRequest(object);
        // }
        // xhr.ontimeout = function(e) {
        //     if (object.timeout)
        //         object.timeout();
        // }
        // xhr.send("str=" + object.url_hash + "&sid=" + object.id + "&t=0");
    }
}