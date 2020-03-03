import React, {Component} from 'react';
import ButtonArrow from '../../components/button-arrow/';
import Slider from "react-slick";
import {Link} from 'react-scroll'


import './welcome.scss';
import {STATIC_FILE, replace_path} from "../../helpers/constants";
import Button from "../button";

class Welcome extends Component {

    next = (index) => {
        this.setState({
            count: index
        })
    };

    slider = React.createRef();

    componentDidMount() {
        setTimeout(() => {
            this.slider.slickGoTo(this.props.currentIndex);

        }, 250);
    }

    render() {
        const data = this.props.data;
        const popUp = this.props.popUp;
        const t = this.props.t;
        const settings = {
            infinite: true,
            speed: 1500,
            slidesToShow: 1,
            slidesToScroll: 1,
            swipeToSlide: true,
            arrows: true,
            dots: true,
            nextArrow: <div className='btn-slick-next'><ButtonArrow/></div>,
            prevArrow: <div className='btn-slick-prev'><ButtonArrow svg={false}/></div>,
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
            <div className="home-welcome">
                <Slider ref={slider => this.slider = slider} {...settings}>
                    {
                        data.map((item) => {
                            return (
                                <div key={item._id} className='home-welcome__item'>
                                    <div className='home-welcome__wrap-img'>
                                        {
                                            popUp ? <img src={replace_path(`${STATIC_FILE}${item.path}`)} alt=""/> :
                                                <img src={replace_path(`${STATIC_FILE}${item.photoMain[0].path}`)} alt=""/>
                                        }
                                    </div>

                                    {
                                        popUp ? '' : <div className='home-welcome__content'>
                                            <div className='home-welcome__title-subtitle'>
                                                <div
                                                    className='home-welcome__title font-small__upper '>{item.content.title}</div>
                                                <div className='home-welcome__subtitle'>{item.content.desc}</div>
                                            </div>
                                            <div className='home-welcome__btn-pointer'>

                                                {item.button.action === 'form' ?
                                                    <Button
                                                        onClick={this.props.openForm}
                                                        label={item.button.label} skew={true}
                                                    />
                                                    : <a href={item.button.url} target='_blank'>
                                                        <Button
                                                            label={item.button.label}
                                                            skew={true}
                                                        />
                                                    </a>
                                                }

                                                <div className='home-welcome__rectangle'></div>
                                                <Link to='home-map' onClick={() => this.props.click(item._id)}
                                                      className='home-welcome__pointer' spy={true} smooth={true}
                                                      duration={2500}>
                                                    <div
                                                        className='home-welcome__pointer-title font-small__upper'>{t('on map')}</div>
                                                    <svg width="14" height="17" viewBox="0 0 14 17" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                              d="M0 6.76033C0 3.03268 3.14018 0 7 0C10.8598 0 13.9999 3.03268 14 6.76033C14 10.8721 9.05135 14.851 7.76356 15.8865C7.60245 16.016 7.49863 16.0995 7.46898 16.1314C7.21892 16.4004 6.78154 16.4009 6.53102 16.1314C6.50137 16.0995 6.39755 16.016 6.23644 15.8865C4.94865 14.851 0 10.8721 0 6.76033ZM3.47816 6.76033C3.47816 8.63582 5.05803 10.1616 7 10.1616C8.94193 10.1616 10.5218 8.63586 10.5218 6.76037C10.5218 4.88488 8.94193 3.35906 7 3.35906C5.05807 3.35906 3.47816 4.88484 3.47816 6.76033Z"
                                                              fill="white"/>
                                                    </svg>

                                                </Link>
                                            </div>
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        );
    }
}

export default Welcome;