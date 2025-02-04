const videos = document.querySelectorAll("video")

videos.forEach(video => {
    video.play()
    video.currentTime = 0;
    
});