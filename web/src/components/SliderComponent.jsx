import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import tmb_1 from '../assets/tmb_1.png';
import tmb_2 from '../assets/tmb_2.png';
import tmb_3 from '../assets/tmb_3.png';
import tmb_4 from '../assets/tmb_4.png';
import tmb_5 from '../assets/tmb_5.png';
import tmb_6 from '../assets/tmb_6.png';


const SliderComponent = () => {

    // let sliderRef = useRef(null);

      const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
      }

  return (
      <Slider ref={slider => (slider)} {...settings}>
          <div>
              <img src={tmb_1} alt="tmb_1"/>
          </div>
          <div>
              <img src={tmb_2} alt="tmb_2"/>
          </div>
          <div>
              <img src={tmb_3} alt="tmb_3"/>
          </div>
          <div>
              <img src={tmb_4} alt="tmb_4"/>
          </div>
          <div>
              <img src={tmb_5} alt="tmb_5"/>
          </div>
          <div>
              <img src={tmb_6} alt="tmb_6"/>
          </div>
      </Slider>
  );
}

export default SliderComponent;
