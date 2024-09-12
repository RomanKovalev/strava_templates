import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import tmb_1 from '../assets/tmb_1.png';
import tmb_2 from '../assets/tmb_2.png';
import tmb_3 from '../assets/tmb_3.png';
import tmb_4 from '../assets/tmb_4.png';
import tmb_5 from '../assets/tmb_5.png';
import tmb_6 from '../assets/tmb_6.png';

const settings: Settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

const SliderComponent: React.FC = () => {
  return (
    <Slider {...settings}>
      <div>
        <img src={tmb_1} alt="Thumbnail 1" />
      </div>
      <div>
        <img src={tmb_2} alt="Thumbnail 2" />
      </div>
      <div>
        <img src={tmb_3} alt="Thumbnail 3" />
      </div>
      <div>
        <img src={tmb_4} alt="Thumbnail 4" />
      </div>
      <div>
        <img src={tmb_5} alt="Thumbnail 5" />
      </div>
      <div>
        <img src={tmb_6} alt="Thumbnail 6" />
      </div>
    </Slider>
  );
};

export default SliderComponent;
