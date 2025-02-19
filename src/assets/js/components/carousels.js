import 'swiper/swiper-bundle.css';

import Swiper from 'swiper/bundle';

function Carousels() {
  const swiperSelectorStage = '...';

  // CAROUSEL NAME SECTION
  if (document.querySelector(swiperSelectorStage)) {
    new Swiper(swiperSelectorStage, {});
  }
  // CAROUSEL NAME SECTION :: END
}

export default Carousels;
