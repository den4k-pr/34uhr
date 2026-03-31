document.addEventListener("DOMContentLoaded", () => {
  const sliderEl = document.querySelector(".holding-items");
  if (!sliderEl) return;

  let swiper = null;

  function handleSlideStyles(isDesktop) {
    const slides = sliderEl.querySelectorAll(".swiper-slide");
    
    slides.forEach(slide => {
      if (isDesktop) {
        // ВИДАЛЯЄМО !important, щоб Swiper міг ставити свої обчислені розміри
        slide.style.removeProperty('width');
        slide.style.removeProperty('height');
      } else {
        slide.style.setProperty('width', '70.56vw', 'important');
        slide.style.setProperty('height', '62.15vw', 'important');
      }
    });
  }

  function initSwiper() {
    const isDesktop = window.innerWidth >= 1000;

    if (isDesktop) {
      if (!swiper) {
        handleSlideStyles(true);
        
        swiper = new Swiper(sliderEl, {
          loop: true,
          slidesPerView: 2,
          spaceBetween: 20,
          centeredSlides: false,
          
          // ВАЖЛИВО ДЛЯ МАКБУКІВ ТА МИШОК:
          simulateTouch: true,   // Імітація тачу мишкою
          grabCursor: true,      // Курсор-ручка при наведенні
          touchEventsTarget: 'container', // Ціль подій - весь контейнер
          
          observer: true,
          observeParents: true,
          
          pagination: {
            el: ".holding-pagination",
            type: "bullets",
            clickable: true
          },
          // Додаємо підтримку мишки/трекпада (опціонально)
          mousewheel: {
            forceToAxis: true,
          },
        });
      }
    } else {
      if (swiper) {
        swiper.destroy(true, true);
        swiper = null;
      }
      handleSlideStyles(false);
    }
  }

  initSwiper();
  
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      initSwiper();
      handleSlideStyles(window.innerWidth >= 1000);
    }, 150);
  });
});