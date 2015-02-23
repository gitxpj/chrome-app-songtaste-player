var st = SongTaste;
Audio.init();
Audio.onprogress = function() {
    if (Audio.isReady && Audio.playing) {

        $(".inner_time").html(formatSeconds(Audio.currentTime) + "/" + formatSeconds(Audio.totalTime));
        $(".inner_progress_bar").width(Audio.getProgressWidth($(".inner_bar").width()));

        if (Audio.playing) {
            $(".play").removeClass("play").addClass("pause");
        }
        if (!Audio.playing || Audio.isEnded) {
            $(".pause").removeClass("pause").addClass("play");
        }
    }
}

//state
//1 LIST_LOOP          列表循环
//2 SINGLE_LOOP     单曲循环
//3 SHUFFLE_LOOP   随机循环

Audio.onended = function() {
    nextPrev();
}

function rand(min, max) {
    return Math.floor(min + Math.random() * (max - min));
};

function nextPrev() {
    if (parseInt(nowIndex) != -1) {
        var plusOne = parseInt(nowIndex + 1);
        if (state == 1 || state == 2) {
            if (plusOne < tempArray.length) {
                playIndex(plusOne);
            } else {
                playIndex(0);
            }
        } else if (state == 3) {
            playIndex(rand(0, tempArray.length - 1));
        }
    } else {
        tipClickCancel = true;
        showTip("请先选择一首歌~");
    }
}

function backPrev() {
    if (parseInt(nowIndex) != -1) {
        var subOne = parseInt(nowIndex - 1);
        if (state == 1 || state == 2) {
            if (subOne > -1) {
                playIndex(subOne);
            } else {
                playIndex(tempArray.length - 1);
            }
        } else if (state == 3) {
            playIndex(rand(0, tempArray.length - 1));
        }
    } else {
        showTip("请先选择一首歌~");
    }
}

function init() {
    nowTitle = null;
    nowPath = null;

    Audio.pause();

    $(".pause").removeClass("pause").addClass("play");

    $(".inner_progress_bar").width(0);
    $(".inner_time").html('00:00/00:00');

    $(".album").attr("src", "img/icon.png");
    $(".title").html("当前没有播放歌曲！");
}

function formatSeconds(value) {
    var theTime = parseInt(value); // 秒
    var theTime1 = 0; // 分
    // alert(theTime);
    if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        // alert(theTime1+"-"+theTime);
    }
    var result = pad(parseInt(theTime), 2);
    if (theTime1 > 0) {
        result = "" + pad(parseInt(theTime1), 2) + ":" + pad(result, 2);
    } else {
        result = "00:" + result;
    }
    return result.replace(/NaN/ig, "00");
}

/* 质朴长存法  by lifesinger */
function pad(num, n) {
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

var progress = false;
var state = 1;
var tipClickCancel = false;
var tempArray = [];
var nowPath = null;
var nowTitle = null;

function hideTip() {
    $("#notify").animate({
        top: '-5%',
        marginTop: '-5%'
    }, "350", function() {
        $("#notify").hide();
        $("#shadow").hide();
        $($("#notify span")[0]).html("");
    });
}

function showTip(str) {
    $($("#notify span")[0]).html(str);
    $("#shadow").show();
    $("#notify").show();
    $("#notify").animate({
        top: '50%',
        marginTop: "height / 2"
    }, "350");
}

function showTitle() {
    $("#title_bar").show();
    $("#title_bar").animate({
        top: '24px'
    }, "fast");
}

function downloadFile(index, path, fileEntry) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.responseType = 'blob';
    xhr.onprogress = function(e) {
        var m = ($("li[index=" + index + "]").width() + 2) / e.total;
        $($("li[index=" + index + "]").find(".download_progress")).width(e.loaded * m);
    }
    xhr.onload = function(e) {
        fileSystem.save(fileEntry, this.response);
    }
    xhr.send();
}

$(function() {
    $(".album").on("error", function() {
        $(this).attr("src", "img/icon.png");
    });

    $("#shadow").on("click", function() {
        if (tipClickCancel) {
            hideTip();
        }
    })

    $(".play").on("click", function() {
        if (Audio.playing) {
            Audio.pause();
            $(".pause").removeClass("pause").addClass("play");
        } else {
            Audio.play();
            $(".play").removeClass("play").addClass("pause");
        }
    })

    $(".loop").on("click", function() {
        if (state == 1) {
            state = 2;
            $(".loop").removeClass("loop").addClass("single");
        } else if (state == 2) {
            state = 3;
            $(".single").removeClass("single").addClass("shuffle");
        } else if (state == 3) {
            state = 1;
            $(".shuffle").removeClass("shuffle").addClass("loop");
        }
    });

    $(".max").on("click", function() {
        if (Audio.audio.muted) {
            Audio.audio.muted = false;
            $(".mute").removeClass("mute").addClass("max");
        } else {
            Audio.audio.muted = true;
            $(".max").removeClass("max").addClass("mute");
        }
    });

    $(".close").on("click", function() {
        window.close();
    });

    $(".min").on("click", function() {
        chrome.app.window.current().minimize();
    });

    $(".download").on("click", function() {
        if (nowPath != null) {
            var filename = nowTitle;
            var url = nowPath;
            var index = nowIndex;

            filename = filename.replace(/\\/gi, "", filename);
            filename = filename.replace(/\//gi, "", filename);
            filename = filename.replace(/:/gi, "", filename);
            filename = filename.replace(/\*/gi, "", filename);
            filename = filename.replace(/\?/gi, "", filename);
            filename = filename.replace(/</gi, "", filename);
            filename = filename.replace(/>/gi, "", filename);
            filename = filename.replace(/\|/gi, "", filename);

            fileSystem.chooseSaveFile(filename + ".mp3", function(callback) {
                if (callback.name != "") {
                    downloadFile(nowIndex, url, callback);
                }
            });
        } else {
            tipClickCancel = true;
            showTip("请先播放一首歌~~~~");
        }

        // chrome.downloads.download({
        //     url: nowPath,
        //     filename: filename + ".mp3",
        //     conflictAction: "overwrite"
        // }, function(downloadId) {
        //     chrome.downloads.show(downloadId);
        // });
        // $("#shadow_img").css({
        //     "backgroundImage": "url()"
        // });
        // init();
        // tipClickCancel = false;
        // getList();
    });

    $(".next").on("click", function() {
        nextPrev();
    });

    $(".back").on("click", function() {
        backPrev();
    });

    tipClickCancel = false;
    getList();
});

function getList() {
    $("ul").remove();
    showTip("正在加载列表~~~~~~");
    //加载列表
    st.getList({
        success: function(data) {
            tempArray = data;
            var ul = $("<ul></ul>");
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var li = $("<li></li>");
                //var img = $("<img></img>");
                var span = $("<span></span>");
                var dp = $("<div class='download_progress'></div>");
                span.html(item.name);
                //img.attr("src", item.author.s_img);
                li.attr("index", i);
                li.on("click", onItemClick);
                //li.append(img);
                li.append(span);
                li.append(dp);
                ul.append(li);
            };
            hideTip();
            //$("body").append(ul);
            $("#container").append(ul);
        }
    });
}

var nowIndex = -1;

function playIndex(index) {
    nowIndex = index;
    if (!progress) {
        $("ul li").removeClass("playing");
        $("li[index=" + index + "]").addClass("playing");
        init();
        progress = true;
        var item = tempArray[index];
        var sid = item.id;
        if (!item.detail) {
            st.getDetails({
                id: sid,
                success: function(detail) {
                    item.detail = detail;
                    nowTitle = detail.title;
                    playDetail(detail);
                }
            });
        } else {
            playDetail(item.detail);
        }
    } else {
        tipClickCancel = true;
        showTip("亲~不要操作这么频繁嘛~");
    }
}

function onItemClick() {
    var item = $(this);
    playIndex(item.attr("index"));
}

function playDetail(detail) {
    $(".title").html("正在播放:&nbsp;" + detail.title);
    //.attr("src", detail.author.l_img);
    // $("#shadow_img").css({
    //     "backgroundImage": "url(" + detail.author.l_img + ")"
    // });
    getImgResources([{
        element: $("#shadow_img"),
        type: "background"
    }, {
        element: $(".album"),
        type: "img"
    }], detail.author.l_img);
    getPath(detail.url_hash, detail.id);
}

function getImgResources(array, path) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.responseType = 'blob';
    xhr.onloadend = function(e) {
        var path = window.URL.createObjectURL(this.response);
        for (var i = 0; i < array.length; i++) {
            var item = array[i];
            if (item.type == "img") {
                $(item.element).attr("src", path);
            } else if (item.type == "background") {
                $(item.element).css({
                    "backgroundImage": "url(" + path + ")"
                });
            }
        }
    };
    xhr.send();
}

function getPath(url_hash, sid) {
    st.getPath({
        url_hash: url_hash,
        id: sid,
        success: function(path) {
            Audio.play(path.play_path);
            nowPath = path.download_path;
            progress = false;
        }
    })
}