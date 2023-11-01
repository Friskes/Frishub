function setPauseImageOnLoad() {
    let video = document.getElementById("background-video");
    let btn_image = document.getElementById("bg-video-btn");

    let videoPaused = window.localStorage.getItem('videoPaused');

    if (videoPaused == 'true') {
        video.play();
        btn_image.src = background_images[1];
    } else if (videoPaused == 'false') {
        video.pause();
        btn_image.src = background_images[0];
    } else {
        window.localStorage.setItem('videoPaused', 'true');
        btn_image.src = background_images[1];
    };
};

function pauseBackgroundVideo() {
    let video = document.getElementById("background-video");
    let btn_image = document.getElementById("bg-video-btn");

    let videoPaused = window.localStorage.getItem('videoPaused');

    if (videoPaused == 'true') {
        window.localStorage.setItem('videoPaused', 'false');
        video.pause();
        btn_image.src = background_images[0];
    } else if (videoPaused == 'false') {
        window.localStorage.setItem('videoPaused', 'true');
        video.play();
        btn_image.src = background_images[1];
    };
};
