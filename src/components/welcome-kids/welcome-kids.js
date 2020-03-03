import React from 'react';
import { STATIC_FILE, replace_path } from "../../helpers/constants";


import '../welcome-content-single/_welcome-content-single.scss';
import { Breadcrumbs } from "react-breadcrumbs-dynamic";
import { NavLink } from "react-router-dom";

const WelcomeKids = ({ content }) => {

    const {
        imageDesktop,
        imageMobile,
        title,
        description
    } = content;

    return (
        <div className="slider__item">
            <div className="breadcrumbs">
                <Breadcrumbs
                    separator={<b> &bull; </b>}
                    item={NavLink}
                    finalItem={'span'}
                />
            </div>

            <img className='welcome-img-kids-desktop' src={replace_path(`${STATIC_FILE}${imageDesktop[0].path}`)} alt="" />
            <img className='welcome-img-kids-mobile' src={replace_path(`${STATIC_FILE}${imageMobile[0].path}`)} alt="" />
            <div className='slider__item-content'>
                <div className='slider__item-title-deadline'>
                    <h1 className='slider__item-title'>{title}</h1>
                    <h3 className='slider__item-description-kids font-medium'>{description}</h3>
                </div>
            </div>
            <div className="scroll-lines">
                <span className="scroll-down-line"></span>
            </div>
        </div>
    );
};
export default WelcomeKids;