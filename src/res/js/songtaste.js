var SongTaste = {
    site: "songtaste.chinacloudsites.cn",
    baseSite: "www.songtaste.com",
    getList: function(object) {
        $.getJSON("https://" + this.site + "/songtaste/list?jsonp=?", function(data) {
            if (object.success && data.success) {
                object.success(data.array);
            } else {
                if (object.error)
                    object.error();
            }
        });
    },
    getDetails: function(object) {
        $.getJSON("https://" + this.site + "/songtaste/details?id=" + object.id + "&jsonp=?", function(data) {
            if (object.success && data.success) {
                object.success(data.detail);
            } else {
                if (object.error)
                    object.error();
            }
        });
    },
    getPath: function(object) {
        //first request
        // $.ajax({
        //     type: 'POST',
        //     url: "http://" + SongTaste.baseSite + '/time.php',
        //     cache: false,
        //     data: 'str=' + object.url_hash + '&sid=' + object.id,
        //     dataType: 'html',

        //     success: function(data) {
        //         if (object.success && data.indexOf("404.html") == -1) {
        //             object.success({
        //                 play_path: data,
        //                 download_path: data.replace(/http:\/\/m/ig, "http://media"),
        //                 success: true
        //             });
        //         }
        //     },
        //     error: function() {
        $.getJSON("https://" + SongTaste.site + "/songtaste/path?sid=" + object.id + "&hash=" + object.url_hash + "&jsonp=?", function(data) {
            if (object.success && data.success) {
                object.success(data);
            } else {
                if (object.error) {
                    object.error();
                }
            }
        })
        //     }
        // });
    }
}