import React, {Component} from 'react';
import ButtonArrow from '../../components/button-arrow/';
import './slider-on-single.scss';
import Slider from "react-slick";
import classNames from "classnames";
import {STATIC_FILE, replace_path} from "../../helpers/constants";

class SliderOnSingle extends Component {
    state = {
        count: 0
    };

    next = (index) => {
        this.setState({
          count: index
      })
    };

    openGallery = () => {
        this.props.openGallery(this.state.count)
    };

    render() {
        const {title, description, data, text_right} = this.props.data;


        const settings = {
            infinite: false,
            speed: 1500,
            slidesToShow: 1,
            slidesToScroll: 1,
            swipeToSlide: true,
            arrows: true,
            nextArrow: <div onClick={this.next} className='btn-slick-next'><ButtonArrow disable={(this.state.count + 1) === data.length}/></div>,
            prevArrow: <div className='btn-slick-prev'><ButtonArrow disable={this.state.count === 0} svg={false}/></div>,
            afterChange: (index) => {
                this.next(index)
            },
            responsive: [
                {
                    breakpoint: 413,
                    settings: {
                        arrows: true,
                        speed: 500,
                    }
                }
            ]
        };
        return (
            <div className={classNames('slider-on-single', {"slider-on-single__revers": text_right})}>
                <div className='slider-on-single__text'>
                    <div className='slider-on-single__title title-section'>{title}</div>
                    <div dangerouslySetInnerHTML={{__html: description}}
                         className={classNames('slider-on-single__item-desc font-medium', {"slider-on-single__item-desc-short font-medium": true})}/>

        
                </div>
                <div className='slider-on-single__slider'>
                    <Slider {...settings}>
                        {
                            data.map((item) => {
                                return (
                                    <div onClick={this.openGallery}  className='slider-on-single__img'>
                                        <img src={replace_path(`${STATIC_FILE}${item.path}`)} alt=""/>
                                    </div>
                                )
                            })
                        }
                    </Slider>

                    <div className='slider-on-single__count'>{(this.state.count + 1) + ' / ' + data.length}</div>
                </div>

            </div>
        );
    }
}

export default SliderOnSingle;