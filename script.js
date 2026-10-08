'use strict';

const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

const video = document.querySelector('.video-player');
const videoPlayButton = document.querySelector('.video-play-button');

if (video && videoPlayButton) {
  videoPlayButton.addEventListener('click', () => {
    video.play().catch((error) => {
      console.error('Unable to play the video.', error);
    });
  });

  video.addEventListener('play', () => {
    videoPlayButton.hidden = true;
  });

  video.addEventListener('pause', () => {
    videoPlayButton.hidden = false;
  });

  video.addEventListener('ended', () => {
    videoPlayButton.hidden = false;
  });
}
