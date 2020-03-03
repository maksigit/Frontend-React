import React, { Component } from 'react';
import Slider from 'react-slick';

import { API_ROOT, STATIC_FILE } from '../../helpers/constants';

import ButtonArrow from '../button-arrow';


class SlickSlider extends Component {

  slider = React.createRef();

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.reset) {
      setTimeout(() => {
        this.slider.slickGoTo(0);
        this.props.end();
      }, 250);
    }
  }

  settings = {
    initialSlide: 0,
    centerMode: true,
    dots: false,
    infinite: false,
    speed: 800,
    slidesToShow: 1,
    arrows: true,
    slidesToScroll: 1,
    afterChange: index => {
      this.props.click(index);
    },
    centerPadding: '17%',
    responsive: [
      {
        breakpoint: 769,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '12%',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 413,
        settings: {
          arrows: true,
          centerMode: false,
          centerPadding: '0',
          slidesToShow: 1
        }
      }
    ]
  };

  render() {
    const data = this.props.item;

    this.settings.nextArrow = <ButtonArrow disable={(this.props.currentSlide + 1) === data.length} left={true} />;
    this.settings.prevArrow = <ButtonArrow disable={this.props.currentSlide === 0} svg={false} skewRight={true} />;

    return (
      <Slider ref={slider => this.slider = slider} {...this.settings}>

        {data.map((item, index) => {
          return (
            <div className="slick__item" key={item}>
              <div className="slick__item__wrap-img">
                <img src={`${STATIC_FILE}${item.path || item.upload[0].path}`} alt="" />

              </div>
              {
                item.description && <div className="tabs__bottom-date">
                  {item.description}
                </div>
              }
            </div>
          );
        })}
      </Slider>
    );
  }
}

export default SlickSlider;
