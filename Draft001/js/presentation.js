/**
 * PM Expert Training - Presentation Navigation System
 */
(function () {
  'use strict';

  let currentSlide = 0;
  let slides = [];
  let totalSlides = 0;

  function init() {
    slides = document.querySelectorAll('.slide');
    totalSlides = slides.length;

    if (totalSlides === 0) return;

    // Check URL hash for starting slide
    const hash = window.location.hash;
    if (hash && hash.startsWith('#slide-')) {
      const num = parseInt(hash.replace('#slide-', ''), 10);
      if (!isNaN(num) && num >= 1 && num <= totalSlides) {
        currentSlide = num - 1;
      }
    }

    createProgressBar();
    createSlideCounter();
    createNavControls();
    showSlide(currentSlide);
    bindEvents();
  }

  function createProgressBar() {
    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    bar.id = 'progressBar';
    document.body.appendChild(bar);
  }

  function createSlideCounter() {
    const counter = document.createElement('div');
    counter.className = 'slide-counter';
    counter.id = 'slideCounter';
    document.body.appendChild(counter);
  }

  function createNavControls() {
    const nav = document.createElement('div');
    nav.className = 'nav-controls';
    nav.innerHTML = `
      <button class="nav-btn" id="btnPrev" title="이전 (←)">◀</button>
      <button class="nav-btn" id="btnNext" title="다음 (→)">▶</button>
      <button class="nav-btn" id="btnFullscreen" title="전체화면 (F)">⛶</button>
    `;
    document.body.appendChild(nav);

    document.getElementById('btnPrev').addEventListener('click', prevSlide);
    document.getElementById('btnNext').addEventListener('click', nextSlide);
    document.getElementById('btnFullscreen').addEventListener('click', toggleFullscreen);
  }

  function showSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    slides.forEach((slide, i) => {
      slide.classList.remove('active', 'prev');
      if (i < index) slide.classList.add('prev');
    });

    slides[index].classList.add('active');
    currentSlide = index;

    // Update progress bar
    const progress = ((index + 1) / totalSlides) * 100;
    const bar = document.getElementById('progressBar');
    if (bar) bar.style.width = progress + '%';

    // Update counter
    const counter = document.getElementById('slideCounter');
    if (counter) counter.textContent = (index + 1) + ' / ' + totalSlides;

    // Update URL hash
    window.location.hash = 'slide-' + (index + 1);

    // Scroll to top if slide has scrollable content
    slides[index].scrollTop = 0;
  }

  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      showSlide(currentSlide + 1);
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      showSlide(currentSlide - 1);
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  function bindEvents() {
    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'Enter':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'Backspace':
          e.preventDefault();
          prevSlide();
          break;
        case 'Home':
          e.preventDefault();
          showSlide(0);
          break;
        case 'End':
          e.preventDefault();
          showSlide(totalSlides - 1);
          break;
        case 'f':
        case 'F':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            toggleFullscreen();
          }
          break;
      }
    });

    // Touch support
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', function (e) {
      const diffX = e.changedTouches[0].screenX - touchStartX;
      const diffY = e.changedTouches[0].screenY - touchStartY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX < 0) nextSlide();
        else prevSlide();
      }
    }, { passive: true });

    // Hash change
    window.addEventListener('hashchange', function () {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#slide-')) {
        const num = parseInt(hash.replace('#slide-', ''), 10);
        if (!isNaN(num) && num >= 1 && num <= totalSlides && num - 1 !== currentSlide) {
          showSlide(num - 1);
        }
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
