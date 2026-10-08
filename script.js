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

const testimonialCarousel = document.querySelector('.testimonial-carousel');

if (testimonialCarousel) {
  const viewport = testimonialCarousel.querySelector('.cards-viewport');
  const track = testimonialCarousel.querySelector('.cards');
  const cards = Array.from(track.children);
  const previousButton = testimonialCarousel.querySelector('[data-carousel-prev]');
  const nextButton = testimonialCarousel.querySelector('[data-carousel-next]');
  const count = testimonialCarousel.querySelector('.carousel-count');
  let index = 0;
  let pointerStartX = null;

  const visibleCardCount = () => (
    window.matchMedia('(max-width: 700px)').matches ? 1 : 3
  );

  const updateCarousel = () => {
    const visibleCount = visibleCardCount();
    const maxIndex = Math.max(0, cards.length - visibleCount);
    index = Math.min(index, maxIndex);

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const cardWidth = cards[0].getBoundingClientRect().width;
    track.style.transform = `translateX(${index * (cardWidth + gap)}px)`;
    previousButton.disabled = index === 0;
    nextButton.disabled = index === maxIndex;

    const first = index + 1;
    const last = Math.min(index + visibleCount, cards.length);
    count.textContent = `${first.toLocaleString('ar')}–${last.toLocaleString('ar')} من ${cards.length.toLocaleString('ar')}`;
  };

  previousButton.addEventListener('click', () => {
    index -= 1;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    index += 1;
    updateCarousel();
  });

  testimonialCarousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      nextButton.click();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      previousButton.click();
    }
  });

  viewport.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button')) {
      return;
    }
    pointerStartX = event.clientX;
  });

  viewport.addEventListener('pointerup', (event) => {
    if (pointerStartX === null) {
      return;
    }

    const delta = event.clientX - pointerStartX;
    pointerStartX = null;

    if (Math.abs(delta) > 40) {
      (delta < 0 ? nextButton : previousButton).click();
    }
  });

  viewport.addEventListener('pointercancel', () => {
    pointerStartX = null;
  });

  window.addEventListener('resize', updateCarousel);
  updateCarousel();
}
