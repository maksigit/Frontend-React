import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import Slider from '.././../libs/slider/main';
import { STATIC_FILE, replace_path } from "../../helpers/constants";
import { MOBILE, isDevice } from "../../helpers/helpers";
import Button from "../button";
import { Link, scroller } from 'react-scroll';
import 'react-awesome-slider/dist/styles.css';
import './awesome-slider-new.scss';


class AwesomeSliderNew extends Component {

    slider_wellcome = new Slider({
        slider: '#slider',
        button_prev: '#button_prev',
        button_next: '#button_next'
    });

    scrollOffset = {
        tablet: -60,
        mobile: -60,
        desktop: -170
    }

    scrollTo() {
        scroller.scrollTo('home-map', {
            duration: 2500,
            delay: 0,
            smooth: 'easeInOutQuart'
        })
    }

    componentDidMount() {

        setTimeout(() => {
            this.slider_wellcome = new Slider({
                slider: '#slider',
                button_prev: '#button_prev',
                button_next: '#button_next'
            });
            this.slider_wellcome.init();
        }, 500);


    }

    componentDidUpdate(prevProps) {
        if (prevProps.categories !== this.props.categories) {
            setTimeout(() => {
                this.slider_wellcome = new Slider({
                    slider: '#slider',
                    button_prev: '#button_prev',
                    button_next: '#button_next'
                });
                this.slider_wellcome.init();
            }, 500);
        }

    }

    componentWillUnmount() {
        delete this.slider_wellcome;
    }

    render() {
        const { data, t } = this.props;

        return (
            <>
                <div className="slider-conteiner">
                    <ul className="slider" id="slider">
                        {
                            data.map((item) => {
                                return (
                                    <li key={item._id} className="home-welcome__item">
                                        <div className="home-welcome__wrap-img">
                                            {
                                                window.innerWidth < MOBILE ?
                                                    <img
                                                        className="scaled-image1 scaleIn"
                                                        src={replace_path(`${STATIC_FILE}${item.content.mediaMobile[0].path}`)}
                                                        alt="" /> :
                                                    <img
                                                        className="scaled-image1 scaleIn"
                                                        src={replace_path(`${STATIC_FILE}${item.content.mediaDesktop[0].path}`)} alt="" />
                                            }
                                        </div>
                                        <div className="home-welcome__content content">
                                            <div className="home-welcome__title-subtitle">
                                                <div
                                                    className="home-welcome__title font-small__upper ">{item.content.title}</div>
                                                <h1 className="home-welcome__subtitle ">{item.content.subTitle}</h1>
                                            </div>
                                            <div className="home-welcome__btn-pointer">
                                                <div
                                                    className="btn-animated-custom">
                                                    {item.content.button.action === 'form' ?
                                                        <a>
                                                            <Button
                                                                onClick={this.props.openForm}
                                                                label={item.content.button.label}
                                                                skew={true}
                                                            /></a>
                                                        : item.content.button.url.includes('http') ?
                                                            <a href={item.content.button.url} target="_blank">
                                                                <Button
                                                                    label={item.content.button.label}
                                                                    skew={true}
                                                                />
                                                            </a> :
                                                            <Link offset={this.scrollOffset[isDevice()]} to={item.content.button.url} spy={true} smooth={true}
                                                                duration={1000}>
                                                                <Button
                                                                    onClick={this.addClass}
                                                                    label={item.content.button.label}
                                                                    skew={true}
                                                                />
                                                            </Link>
                                                    }
                                                </div>
                                                <div
                                                    className="home-welcome__rectangle" />

                                                <a onClick={() => this.scrollTo()}
                                                    className="home-welcome__pointer"
                                                >
                                                    <div
                                                        className="home-welcome__pointer-title font-small__upper ">{t('on map')}</div>
                                                    <div className="icon-map ">
                                                        <svg width="14" height="17" viewBox="0 0 14 17" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd"
                                                                d="M0 6.76033C0 3.03268 3.14018 0 7 0C10.8598 0 13.9999 3.03268 14 6.76033C14 10.8721 9.05135 14.851 7.76356 15.8865C7.60245 16.016 7.49863 16.0995 7.46898 16.1314C7.21892 16.4004 6.78154 16.4009 6.53102 16.1314C6.50137 16.0995 6.39755 16.016 6.23644 15.8865C4.94865 14.851 0 10.8721 0 6.76033ZM3.47816 6.76033C3.47816 8.63582 5.05803 10.1616 7 10.1616C8.94193 10.1616 10.5218 8.63586 10.5218 6.76037C10.5218 4.88488 8.94193 3.35906 7 3.35906C5.05807 3.35906 3.47816 4.88484 3.47816 6.76033Z"
                                                                fill="white" />
                                                        </svg>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div class="awssld__controls">
                    <button className="awssld__prev" id="button_prev">
                        <span className="awssld__controls__arrow-left"></span>
                    </button>
                    <button className="awssld__next" id="button_next">
                        <span className="awssld__controls__arrow-right"></span>
                    </button>
                </div>

            </>
        );
    }
}

export default withTranslation()(AwesomeSliderNew);