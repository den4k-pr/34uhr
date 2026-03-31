document.addEventListener("DOMContentLoaded", () => {
  const sliderEl = document.querySelector(".holding-items");
  if (!sliderEl) return;

  let swiper = null;

  function handleSlideStyles(isDesktop) {
    const slides = sliderEl.querySelectorAll(".swiper-slide");
    
    slides.forEach(slide => {
      if (isDesktop) {
        // На десктопі очищаємо все, щоб Swiper сам керував шириною
        slide.style.setProperty('width', 'auto', 'important');
        slide.style.setProperty('height', 'auto', 'important');
      } else {
        // На мобілці залізобетонно ставимо твої розміри
        slide.style.setProperty('width', '70.56vw', 'important');
        slide.style.setProperty('height', '62.15vw', 'important');
      }
    });
  }

  function initSwiper() {
    const isDesktop = window.innerWidth >= 1000;

    if (isDesktop) {
      if (!swiper) {
        // Спочатку готуємо стилі
        handleSlideStyles(true);
        
        swiper = new Swiper(sliderEl, {
          loop: true,
          slidesPerView: 2,
          spaceBetween: 20,
          centeredSlides: false,
          loopedSlides: 3, 
          observer: true,
          observeParents: true,
          pagination: {
            el: ".holding-pagination",
            type: "bullets",
            clickable: true
          }
        });
      }
    } else {
      if (swiper) {
        swiper.destroy(true, true);
        swiper = null;
      }
      // Після знищення слайдера повертаємо мобільні стилі
      handleSlideStyles(false);
    }
  }

  // Запускаємо при старті
  initSwiper();
  
  // Додаємо невеликий debounce для ресайзу, щоб не лагало
  window.addEventListener("resize", () => {
    initSwiper();
    // Додатковий прогін стилів для надійності при зміні вікна
    handleSlideStyles(window.innerWidth >= 1000);
  });
});