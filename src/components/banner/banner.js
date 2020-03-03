import React from 'react';
import {STATIC_FILE, replace_path} from '../../helpers/constants';
import './banner.scss';
import Button from '../button';
import {isMobile} from "../../helpers/helpers";


const Banner = ({action, url, desc, img, buttonText, openModal, mobilePhoto}) => {

    const images = isMobile() ? mobilePhoto : img;

    return (
        <div className="banner">
            <div className="banner__img">
                {isMobile}
                <img src={replace_path(`${STATIC_FILE}${images}`)} alt="banner"/>
            </div>
            <div className="banner__desc-button">
                <div className="banner__desc font-large">{desc}</div>
                {action === 'form' ?
                    <Button
                        onClick={openModal}
                        label={buttonText}
                        skew={true}
                    />
                    : <a href={url} target="_blank">
                        <Button
                            label={buttonText}
                            skew={true}
                        />
                    </a>
                }
            </div>
        </div>
    );
};
export default Banner;
