export default function Marquee() {
  const scrollSliders = document.querySelectorAll('.marquee-slider');

  if (scrollSliders.length === 0) return;

  const DEFAULT_SPEED = 0.05;
  const RESIZE_DELAY = 200;

  for (const slider of scrollSliders) {
    const speed = Number.parseFloat(slider.dataset.speed) || DEFAULT_SPEED;
    const isReverse = slider.dataset.reverse === 'true';

    const children = [...slider.children];
    const baseChildren = children.map((child) => child.outerHTML).join('');
    const baseChildrenWidth = children.reduce(
      (sum, child) => sum + child.offsetWidth,
      0
    );

    let windowWidth = document.documentElement.clientWidth;
    let sliderWidth;
    let countWidth = 0;
    let addCount = 1;

    /**
     * @description Ініціалізація слайдера
     */
    const initializeSlider = () => {
      slider.innerHTML = baseChildren; // Очистка перед додаванням

      let checkWidth = windowWidth * 2;
      sliderWidth = baseChildrenWidth;
      countWidth = sliderWidth;
      addCount = 1;

      while (countWidth < checkWidth) {
        slider.insertAdjacentHTML('beforeend', baseChildren);
        countWidth += sliderWidth;
        addCount++;
      }
    };

    initializeSlider();

    const unit = isReverse ? '' : '-';

    if (isReverse) {
      slider.style.marginLeft = `-${sliderWidth}px`;
    }

    let animation = slider.animate(
      { transform: `translateX(${unit}${sliderWidth}px)` },
      {
        fill: 'backwards',
        duration: sliderWidth / speed,
        easing: 'linear',
        iterations: Infinity
      }
    );

    let resizeTimeout;
    let lastWindowWidth = document.documentElement.clientWidth;

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        if (lastWindowWidth !== document.documentElement.clientWidth) {
          lastWindowWidth = document.documentElement.clientWidth;
          windowWidth = lastWindowWidth;

          requestAnimationFrame(() => {
            initializeSlider();

            if (isReverse) {
              slider.style.marginLeft = `-${sliderWidth}px`;
            }

            animation.cancel();
            animation = slider.animate(
              { transform: `translateX(${unit}${sliderWidth}px)` },
              {
                fill: 'backwards',
                duration: sliderWidth / speed,
                easing: 'linear',
                iterations: Infinity
              }
            );
          });
        }
      }, RESIZE_DELAY);
    });
  }
}
