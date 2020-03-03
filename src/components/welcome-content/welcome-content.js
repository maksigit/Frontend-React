import React from 'react';

import Button from '../button';
import {API_ROOT} from "../../helpers/constants";

import './_welcome-content.scss';

import {Link, animateScroll as scroll} from 'react-scroll'


const WelcomeContent = ({item}) => {
    const {address, title} = item;

    const showAll = () => {
        document.getElementById('main-header').classList.add('not-scroll');
        const wHeight = document.documentElement.clientHeight - 80;
        scroll.scrollTo(wHeight);
    }

    return (
        <div className="slider__item"
             style={{backgroundImage: `url('${API_ROOT}/${item.path}')`}}
        >
            <div className='slider__item-content'>
                <div className='slider__item-label font-small'>{address}</div>
                <div className='slider__item-title-deadline'>
                    <h1 className='slider__item-title'>{title}</h1>
                </div>
                <div className='slider__item-content-btns'>
                    <Link to=' ' onClick={showAll} className='slider__item-btn' spy={true} smooth={true}
                          duration={5000}>
                        <Button
                            label='СМОТРЕТЬ ВСЕ'
                            skew={true}
                        />
                    </Link>
                    <div className='slider__item-rectangle'></div>
                    <div className='slider__item-map-point'>
                        <Link to='2' className='font-small'>На карте</Link>
                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M0 5.38067C0 2.41377 2.46728 0 5.5 0C8.53269 0 10.9999 2.41377 11 5.38067C11 8.65327 7.11177 11.8202 6.09994 12.6444C5.97335 12.7475 5.89178 12.8139 5.86848 12.8393C5.67201 13.0534 5.32835 13.0538 5.13152 12.8393C5.10822 12.8139 5.02665 12.7475 4.90006 12.6444C3.88823 11.8202 0 8.65327 0 5.38067ZM2.73284 5.38067C2.73284 6.87341 3.97416 8.08784 5.5 8.08784C7.02581 8.08784 8.26713 6.87344 8.26713 5.3807C8.26713 3.88796 7.02581 2.67353 5.5 2.67353C3.97419 2.67353 2.73284 3.88793 2.73284 5.38067Z"
                                  fill="white"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

    );
};
export default WelcomeContent;