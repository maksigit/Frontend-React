import React, { Component } from 'react';
import { STATIC_FILE, replace_path } from "../../helpers/constants";
import Slider from 'react-slick';

import '../tabs-with-arrows/tabs-with-arrows.scss';
import GMap from "../g-map/g-map";

class TabsWithArrowsTemplate extends Component {

    slider = React.createRef();

    state = {
        tabIndex: 0,
        page: 1,
        data: [],
        windowsWith: 6
    };

    tabToggle = (tabIndex) => () => {
        this.setState(
            {
                tabIndex: tabIndex,
                page: tabIndex + 1
            });

        this.slider.slickGoTo(tabIndex);
    };

    pageNext = () => {
        if (this.state.page >= this.props.item.length) return;
        this.setState((prevState) => {
            return {
                ...prevState,
                page: prevState.page + 1,
                tabIndex: prevState.tabIndex + 1
            }
        });
    };

    allMarkets = (data) => {
        return data.reduce((total, element) => {
            return [...total, ...element.data];
        }, []);
    };

    pagePrev = () => {
        if (this.state.page <= 1) return;

        this.setState((prevState) => {
            return {
                ...prevState,
                page: prevState.page - 1,
                tabIndex: prevState.tabIndex - 1
            }
        })
    };

    componentDidMount() {
        const windowWith = window.innerWidth < 413 ? 2 : window.innerWidth < 769 ? 4 : 6;

        this.setState({
            windowsWith: windowWith
        })
    }


    render() {
        const data = this.props.item;
        const dataLength = data.length;
        const arrows = this.props.arrows;
        const t = this.props.t;

        const settings = {
            infinite: false,
            speed: 500,
            slidesToShow: dataLength < this.state.windowsWith ? dataLength : this.state.windowsWith,
            slidesToScroll: 1,
            swipeToSlide: true,
            arrows: true,
            nextArrow: <div className={this.state.page === dataLength ? "slick-btn-next cursor-default" : "slick-btn-next"}>
                <svg className={this.state.page === dataLength ? "slick-btn-next cursor-default" : ""} onClick={this.pageNext} width="45" height="11" viewBox="0 0 45 11" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                        d="M40.1008 0.165432C39.8965 -0.0551441 39.5564 -0.0551441 39.3449 0.165432C39.1405 0.378557 39.1405 0.733267 39.3449 0.945895L43.178 4.94359H0.529216C0.23436 4.94409 0 5.18851 0 5.49603C0 5.80354 0.23436 6.05591 0.529216 6.05591H43.178L39.3449 10.0462C39.1405 10.2667 39.1405 10.6219 39.3449 10.8346C39.5564 11.0551 39.897 11.0551 40.1008 10.8346L44.8414 5.89048C45.0529 5.67736 45.0529 5.32264 44.8414 5.11002L40.1008 0.165432Z"
                          fill={this.state.page === dataLength ? "#B5B5B5" : "#BEA972"} />
                </svg>
            </div>,
            prevArrow: <div className={this.state.page === 1 ? "slick-btn-next cursor-default" : "slick-btn-next"}>
                <svg className={this.state.page === 1 ? "slick-btn-next cursor-default" : ""} onClick={this.pagePrev} width="45" height="11" viewBox="0 0 45 11" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                        d="M4.89917 0.165432C5.10352 -0.0551441 5.44363 -0.0551441 5.65513 0.165432C5.85948 0.378557 5.85948 0.733267 5.65513 0.945895L1.82201 4.94359H44.4708C44.7656 4.94409 45 5.18851 45 5.49603C45 5.80354 44.7656 6.05591 44.4708 6.05591H1.82201L5.65513 10.0462C5.85948 10.2667 5.85948 10.6219 5.65513 10.8346C5.44363 11.0551 5.10305 11.0551 4.89917 10.8346L0.158623 5.89048C-0.0528717 5.67736 -0.0528717 5.32264 0.158623 5.11002L4.89917 0.165432Z"
                          fill={this.state.page === 1 ? "#B5B5B5" : "#BEA972"} />
                </svg>
            </div>,
            slickNext: () => {
            },
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: true,
                        slidesToShow: dataLength < this.state.windowsWith ? dataLength : this.state.windowsWith
                    }
                },
                {
                    breakpoint: 413,
                    settings: {
                        centerMode: true,
                        centerPadding: '20%',
                        arrows: true,
                        slidesToShow: 1
                    }
                }
            ]
        };

        return (
            <div className='tabs'>
                {dataLength < 6 ? <div className='tabs__arrows'></div> :
                    arrows === true && <div className='tabs__arrows'>
                        <div className='tabs__arrows-count'>
                            <div className='tabs-arrows__count-part font-small'>{this.state.page}</div>
                            <div className='tabs-arrows__count-all font-small'> {dataLength}</div>
                        </div>
                    </div>
                }

                <div className='tabs__top'>
                    <Slider ref={slider => this.slider = slider} {...settings}>
                        {
                            data.map((item, index) => {
                                return (
                                    <div key={item._id} onClick={this.tabToggle(index)}
                                        className={this.state.tabIndex === index ? 'tabs__item active' : 'tabs__item'}>
                                        <div className='tabs__item-intro'>
                                            {
                                                item.icon ? <div className='tabs__item-intro-img'>
                                                    <img src={replace_path(`${STATIC_FILE}${item.icon[0].path}`)} alt="" />
                                                </div> : null
                                            }
                                            <div className='font-small'>
                                                {item.title || item.tab_title}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
                <div className='tabs__bottom'>
                    {arrows === true ? <div className='tabs__bottom-flex'>
                        <div className='tabs__top-active'
                            style={{ width: ((this.state.tabIndex + 1) * (100 / dataLength)) + '%' }}> </div>
                        <div className="tabs__top-line"></div>
                        <img src={replace_path(`${STATIC_FILE}${this.props.item[this.state.tabIndex].image[0].path}`)}
                            alt='advantage' />
                        <div
                            className='tabs__bottom-img-desc font-medium'>{this.props.item[this.state.tabIndex].description}</div>
                    </div> :
                        <GMap
                            googleMapURL={window.google}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `6rem` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            data={this.state.tabIndex === 0 ? this.allMarkets(data) : data[this.state.tabIndex].data}
                            point={this.props.mainPoint}
                            t={this.props.t}
                        />
                    }

                </div>
            </div>
        )

    }
}

export default TabsWithArrowsTemplate;
