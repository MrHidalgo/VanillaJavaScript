export default function Marquee() {
  const scrollSliders = document.querySelectorAll('.marquee-slider');

  if (scrollSliders.length === 0) return;

  const DEFAULT_SPEED = 0.05;
  const RESIZE_DELAY = 200;

  for (const slider of scrollSliders) {
    const speed = Number.parseFloat(slider.dataset.speed) || DEFAULT_SPEED;
    const isReverse = slider.dataset.reverse === 'true';

    const children = [...slider.children];
    const baseChildrenHTML = children.map((child) => child.outerHTML).join('');
    let baseChildrenWidth = children.reduce(
      (sum, child) => sum + child.offsetWidth,
      0
    );

    let windowWidth = document.documentElement.clientWidth;
    let sliderWidth = baseChildrenWidth || 1;
    let addCount = 1;
    let animation;
    let resizeTimeout;
    let lastWindowWidth = windowWidth;

    /**
     * @description Ініціалізація слайдера (без перезапису DOM)
     */
    const initializeSlider = () => {
      baseChildrenWidth = children.reduce(
        (sum, child) => sum + (child.offsetWidth || 1),
        0
      );
      if (baseChildrenWidth <= 1) return;

      let checkWidth = windowWidth * 2;
      sliderWidth = baseChildrenWidth;
      addCount = 1;

      while (sliderWidth * addCount < checkWidth) {
        addCount++;
      }

      if (slider.children.length < addCount * children.length) {
        for (let index = 0; index < addCount - 1; index++) {
          slider.insertAdjacentHTML('beforeend', baseChildrenHTML);
        }
      }
    };

    initializeSlider();

    const unit = isReverse ? '' : '-';
    if (isReverse) {
      slider.style.marginLeft = `-${sliderWidth}px`;
    }

    const startAnimation = () => {
      if (animation) animation.cancel();

      const duration = sliderWidth / (speed || DEFAULT_SPEED);
      if (duration <= 0 || isNaN(duration) || !isFinite(duration)) return;

      animation = slider.animate(
        { transform: `translateX(${unit}${sliderWidth}px)` },
        {
          fill: 'backwards',
          duration,
          easing: 'linear',
          iterations: Infinity
        }
      );
    };

    startAnimation();

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (lastWindowWidth !== document.documentElement.clientWidth) {
          lastWindowWidth = document.documentElement.clientWidth;
          windowWidth = lastWindowWidth;

          requestAnimationFrame(() => {
            initializeSlider();
            startAnimation();
          });
        }
      }, RESIZE_DELAY);
    });
  }
}
