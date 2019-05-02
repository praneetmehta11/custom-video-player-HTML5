var video = document.getElementById("customVideo");
var videoPlayerContainer = document.getElementById("videoPlayerContainer");
var videoContainer = document.getElementById("videoContainer");
var videoControls = document.getElementById("videoControls");
var progress = document.getElementById("videoProgress");
var progressBar = document.getElementById("videoProgressBar");
var progressBarTip = document.getElementById("videoProgressBarTip");
var playPauseButton = document.getElementById("playpause");
var playpausePosterButton = document.getElementById("playpausePosterButton");
var playpausePoster = document.getElementById("playpausePoster");
var volumneButton = document.getElementById("volume");
var volumeValue = document.getElementById("volumeValue");
var volumeBar = document.getElementById("volumeBar");
var volumeBarTip = document.getElementById("volumeBarTip");
var videoTime = document.getElementById("videoTime");
var fullscreen = document.getElementById("fullscreen");
var THIS = this;
var progressBarClicked = false;
var volumeBarClicked = false;
var paused = true;
var currentVolume = 1;
var isFullscreen = false;
var defalutsize = "600px";

function updateVolumebar() {
    var pos = video.volume * 100;
    volumeValue.style.width = pos + "%";
    if (pos == 0) {
        volumneButton.innerHTML = '<i class="fas fa-volume-off"> </i>';
        volumeBar.style.marginLeft = '19px';
    } else {
        volumneButton.innerHTML = '<i class="fas fa-volume-up"> </i>';
        volumeBar.style.marginLeft = '6px';
    }
}

function togglePlayPause() {
    if (video.paused) {
        video.play();
        playPauseButton.innerHTML = '<i class="far fa-pause-circle" aria-hidden="true"></i>'
    } else {
        video.pause();
        playPauseButton.innerHTML = '<i class="far fa-play-circle" aria-hidden="true"></i>'
    }
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        videoPlayerContainer.requestFullscreen();
        videoControls.style.bottom = "0px";
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            videoControls.style.bottom = "6px";
        }
    }
}

fullscreen.onclick = function() {
    toggleFullscreen();
}

function toggleAudio() {
    video.muted = !video.muted;
    if (video.muted) {
        currentVolume = video.volume;
        if (video.volume == 0) currentVolume = 1;
        video.volume = 0;
        volumneButton.innerHTML = '<i class="fas fa-volume-off"> </i>';
        volumeBar.style.marginLeft = '19px';
    } else {
        video.volume = currentVolume;
        volumneButton.innerHTML = '<i class="fas fa-volume-up"> </i>';
        volumeBar.style.marginLeft = '6px';
    }
    updateVolumebar();
}

playPauseButton.onclick = function() {
    togglePlayPausePoster();
    togglePlayPause();
}
volumneButton.onclick = function() {
    toggleAudio();
}

function updateProgressbar() {
    var pos = (video.currentTime / video.duration) * 100;
    progress.style.width = pos + "%";
}

function updateTime() {
    var currentTime = Math.floor(video.currentTime * 1000);
    var duration = Math.floor(video.duration * 1000);
    var cH, cM, cS;
    var dH, dM, dS;
    cH = Math.floor((currentTime / (1000 * 60 * 60)) % 24);
    cM = Math.floor((currentTime / (1000 * 60)) % 60);
    cS = Math.floor((currentTime / 1000) % 60);
    cH = (cH < 10) ? "0" + cH : cH;
    cM = (cM < 10) ? "0" + cM : cM;
    cS = (cS < 10) ? "0" + cS : cS;
    currentTime = cH + ":" + cM + ":" + cS;
    if (cH == '00') currentTime = currentTime.substring(3);
    dH = Math.floor((duration / (1000 * 60 * 60)) % 24);
    dM = Math.floor((duration / (1000 * 60)) % 60);
    dS = Math.floor((duration / 1000) % 60);
    dH = (dH < 10) ? "0" + dH : dH;
    dM = (dM < 10) ? "0" + dM : dM;
    dS = (dS < 10) ? "0" + dS : dS;
    duration = dH + ":" + dM + ":" + dS;
    if (dH == '00') duration = duration.substring(3);
    var str = '<b>' + currentTime + '</b>' + ' / ' + duration;
    videoTime.innerHTML = str;
}

video.addEventListener('timeupdate', function() {
    updateProgressbar()
    updateTime();
    if (video.ended) {
        playPauseButton.innerHTML = '<i class="far fa-play-circle" aria-hidden="true"></i>'
    }
});

function togglePlayPausePoster() {
    if (video.paused) {
        playpausePosterButton.innerHTML = '<i class="far fa-pause-circle" aria-hidden="true"></i>'
        playpausePoster.style.opacity = 0;

    } else {
        playpausePosterButton.innerHTML = '<i class="far fa-play-circle" aria-hidden="true"></i>'
        playpausePoster.style.opacity = 1;
    }
}

playpausePoster.addEventListener('click', function() {
    togglePlayPausePoster();
    togglePlayPause();
});

progressBar.addEventListener('mousedown', function(e) {
    video.pause();
    THIS.progressBarClicked = true;
    var pos = (e.clientX - progressBar.getBoundingClientRect().left) / this.offsetWidth;
    pos = pos * 100;
    video.currentTime = (video.duration / 100) * pos;
});
progressBar.addEventListener('mousemove', function(e) {
    if (THIS.progressBarClicked == false) return;
    var pos = (e.clientX - progressBar.getBoundingClientRect().left) / this.offsetWidth;
    pos = pos * 100;
    video.currentTime = (video.duration / 100) * pos;
    updateProgressbar()
    updateTime();
});
progressBar.addEventListener('mouseup', function(e) {
    if (THIS.progressBarClicked == false) return;
    var pos = (e.clientX - progressBar.getBoundingClientRect().left) / this.offsetWidth;
    pos = pos * 100;
    video.currentTime = (video.duration / 100) * pos;
    THIS.progressBarClicked = false;
    video.play();
});
progressBar.addEventListener('mouseleave', function(e) {
    if (THIS.progressBarClicked == false) return;
    var pos = (e.clientX - progressBar.getBoundingClientRect().left) / this.offsetWidth;
    pos = pos * 100;
    video.currentTime = (video.duration / 100) * pos;
    THIS.progressBarClicked = false;
    video.play();
});

volumeBar.addEventListener('mousedown', function(e) {
    THIS.volumeBarClicked = true;
    var pos = (e.clientX - volumeBar.getBoundingClientRect().left) / this.offsetWidth;
    pos = pos < 0 ? 0 : pos;
    pos = pos > 1 ? 1 : pos;
    video.volume = pos;
    updateVolumebar();
});
volumeBar.addEventListener('mousemove', function(e) {
    if (THIS.volumeBarClicked == false) return;
    var pos = (e.clientX - volumeBar.getBoundingClientRect().left) / this.offsetWidth;
    pos = pos < 0 ? 0 : pos;
    pos = pos > 1 ? 1 : pos;
    video.volume = pos;
    updateVolumebar();
});
volumeBar.addEventListener('mouseup', function(e) {
    if (THIS.volumeBarClicked == false) return;
    var pos = (e.clientX - volumeBar.getBoundingClientRect().left) / this.offsetWidth;
    pos = pos < 0 ? 0 : pos;
    pos = pos > 1 ? 1 : pos;
    video.volume = pos;
    THIS.volumeBarClicked = false;
    updateVolumebar();
});
volumeBar.addEventListener('mouseleave', function(e) {
    if (THIS.volumeBarClicked == false) return;
    var pos = (e.clientX - volumeBar.getBoundingClientRect().left) / this.offsetWidth;
    pos = pos < 0 ? 0 : pos;
    pos = pos > 1 ? 1 : pos;
    video.volume = pos;
    THIS.volumeBarClicked = false;
    updateVolumebar();
});

/*
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});*/