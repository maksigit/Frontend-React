import React, {Component} from 'react';

import './tabs.scss';
import SlickSlider from "../slider";
import Slider from "react-slick";

class Tabs extends Component {
    state = {
        tabIndex: 0,
        count: 0,
        reset: false,
        page: 0
    };

    pageNext = () => {
        if ((this.state.page + 1) >= (this.props.item.length / 10)) return;
        this.setState((prevState) => {
            return {
                ...prevState,
                page: prevState.page + 1
            }
        })
    };

    pagePrev = () => {
        if (this.state.page < 1) return;

        this.setState((prevState) => {
            return {
                ...prevState,
                page: prevState.page - 1
            }
        })
    };

    tabToggle = (tabIndex) => () => {
        this.setState({
            tabIndex: tabIndex,
            reset: true,
            count: 0
        });
    };

    countSlide = (index) => {
        this.setState({count: index})
    };

    end = () => this.setState({reset: false});


    render() {
        const data = this.props.item;
        const dataLength = data.length;
        const arrows = this.props.arrows;

        const settings = {
            // dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: dataLength < 10 ? dataLength : 10,
            slidesToScroll: 1,
            swipeToSlide: true,
            arrows: true,
            nextArrow: <div onClick={this.pageNext} className='tab-arrow-right'>
                <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.939211 0.165432C0.728119 -0.0551441 0.376791 -0.0551441 0.158319 0.165432C-0.0527729 0.378557 -0.0527729 0.733267 0.158319 0.945895L4.11789 4.94359V6.05591L0.158319 10.0462C-0.0527729 10.2667 -0.0527729 10.6219 0.158319 10.8346C0.376791 11.0551 0.728611 11.0551 0.939211 10.8346L5.83615 5.89048C6.05462 5.67736 6.05462 5.32264 5.83615 5.11002L0.939211 0.165432Z" fill="#B5B5B5"/>
                </svg>
            </div>,
            prevArrow: <div onClick={this.pagePrev} className='tab-arrow-left'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 11" width="6" height="11">
                    <path id="Layer" fillRule="evenodd" className="shp0"
                          d="M5.06 10.83C5.27 11.06 5.62 11.06 5.84 10.83C6.05 10.62 6.05 10.27 5.84 10.05L1.88 6.06L1.88 4.94L5.84 0.95C6.05 0.73 6.05 0.38 5.84 0.17C5.62 -0.06 5.27 -0.06 5.06 0.17L0.16 5.11C-0.05 5.32 -0.05 5.68 0.16 5.89L5.06 10.83Z" fill="#B5B5B5"/>
                </svg>
            </div>,
            responsive: [
                {
                    breakpoint: 769,
                    settings: {
                        arrows: false,
                        slidesToShow: dataLength < 6 ? dataLength : 6
                    }
                },
                {
                    breakpoint: 413,
                    settings: {
                        arrows: false,
                        slidesToShow: dataLength < 3 ? dataLength : 3,
                    }
                }
            ]
        };
        return (
            <div className='tabs'>
                <div className='tabs__top'>
                    <Slider {...settings}>
                        {
                            data.map((item, index) => {
                                if (item.data.length > 0) {
                                    return (
                                        <div key={item._id} onClick={this.tabToggle(index)}
                                             className={this.state.tabIndex === index ? 'tabs__item font-small active' : 'tabs__item font-small'}>
                                            {item.tab_title || item.title}
                                        </div>
                                    )
                                }
                            })
                        }
                    </Slider>
                    <div className='tabs__top-wrap-overflow'>
                        {
                            data.map((item, index) => {
                                if (item.data.length > 0) {
                                    return (
                                        <div key={item._id} onClick={this.tabToggle(index)}
                                             className={this.state.tabIndex === index ? 'tabs__item font-small active' : 'tabs__item font-small'}>
                                            {item.tab_title || item.title}
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                <div className='tabs__bottom'>
                    <SlickSlider
                        currentSlide={this.state.count}
                        reset={this.state.reset}
                        end={this.end}
                        click={this.countSlide}
                        item={data[this.state.tabIndex].data}
                    />
                </div>

                {arrows === false && <div
                    className='tabs__bottom-count'>{(this.state.count + 1) + ' / ' + data[this.state.tabIndex].data.length}</div>
                }
            </div>
        )
    }
}

export default Tabs