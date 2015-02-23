var Audio = {
    audio: null,
    currentTime: -1,
    totalTime: -1,
    isReady: false,
    isEnded: false,
    readyState: -1,
    playing: false,
    init: function(object) {
        this.audio = document.createElement("audio");
        this.audio.addEventListener("timeupdate", this.__onprogress__);
        this.audio.addEventListener("error", this.__onerror__);
    },
    destory: function() {
        this.pause();
        this.audio = null;
    },
    play: function(src) {
        Audio.isEnded = false;
        if (src) {
            this.audio.src = src;
        }
        Audio.playing = true;
        this.audio.play();
    },
    pause: function() {
        Audio.playing = false;
        this.audio.pause();
    },
    getProgressWidth: function(parentWidth) {
        var x = parentWidth / Audio.totalTime;
        return Audio.currentTime * x;
        //return n;
    },
    __onprogress__: function() {
        if (Audio.audio.readyState == 4)
            Audio.isReady = true;
        Audio.currentTime = this.currentTime;
        Audio.totalTime = this.duration;
        if (this.currentTime == this.duration) {
            Audio.isEnded = true;
            if (Audio.onended)
                Audio.onended();
        } else if (Audio.onprogress) {
            Audio.onprogress();
        }
    },
    __onerror__: function() {
        if (Audio.onerror)
            Audio.onerror();
    }
}