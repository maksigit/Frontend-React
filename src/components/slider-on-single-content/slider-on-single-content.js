import React, {useState, useEffect} from 'react';

import {API_ROOT} from "../../helpers/constants";

import './_slider-on-single-content.scss';
import {animateScroll as scroll} from 'react-scroll'
import classNames from "classnames";
import MoreText from "../more-text/more-text";
import {MOBILE} from "../../helpers/helpers";


const SliderOnSingleContent = ({item, title, desc, open, textright=false}) => {
    // const {_id, desc, title, urlImg, deadLine} = item;
    const openG = open;
    const showAll = () => {
        document.getElementById('main-header').classList.add('not-scroll');
        const wHeight = document.documentElement.clientHeight - 80;
        scroll.scrollTo(wHeight);
    };

    const [openT, setOpenT] = useState(false);

    useEffect(() => {
        if(window.innerWidth < MOBILE && desc.length > 150 ) {
            setOpenT(true)
        }
    }, []);

    const toggleHeight = () => {
        setOpenT((openT) => {

            return !openT

        })
    };

    return (
        <div className={classNames('slider__item', {
            'slider__item-right': textright,
        })}>
            <div className='slider__item-content'>
                <div className='slider__item-title'>{title}</div>
                <div dangerouslySetInnerHTML={{ __html: desc }} className={classNames('slider__item-desc', {"slider__item-desc-short": openT})}/>

                <div onClick={toggleHeight} className='img-text__more'>
                    <MoreText open={openT} />
                </div>
            </div>

            <div onClick={openG} className='slider__item-img' style={{backgroundImage: `url('${API_ROOT}/${item.path}')`}}>

            </div>

            <div className='slider__item-rectangle'> </div>
        </div>

    );
};
export default SliderOnSingleContent;