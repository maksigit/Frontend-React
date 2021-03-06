import React from 'react';
import { STATIC_FILE, replace_path } from "../../helpers/constants";

import Button from '../button';


import './_welcome-content-single.scss';
import { Link } from 'react-scroll'

import { Breadcrumbs } from "react-breadcrumbs-dynamic";
import { NavLink } from "react-router-dom";

const WelcomeContentSingle2 = ({ content, openCamera, openModal, phone, t, otherLink, dataDeadline }) => {

    const {
        photoMain,
        city,
        address,
        rayon,
        title,
        deadline,
        button,
        district
    } = content;

    const removeHttps = (str) => {
        if (str.includes('https://')) {
            return str.replace('https://', '')
        } else {
            return str.replace('http://', '')
        }
    };

    return (
        <div className="slider__item">
            <div className="breadcrumbs">
                <Breadcrumbs
                    separator={<b> &bull; </b>}
                    item={NavLink}
                    finalItem={'span'}
                />
            </div>

            <img src={replace_path(`${STATIC_FILE}${photoMain[0].path}`)} alt="" />
            <div className='slider__item-content'>
                <h4 className='slider__item-label font-small'>{t('city_short')} {t(district.city.name)}, {district.main.name} {t('district_short')}, {address}</h4>
                <div className='slider__item-title-deadline'>
                    <h1 className='slider__item-title'>{title}</h1>
                    <div className='slider__item-wrap-phone'>
                        {
                            phone.map((item) => {
                                return (
                                    <a href={'tel:' + item.label} className='slider__item-phone font-medium'>
                                        {item.label}
                                    </a>
                                )
                            })
                        }
                        <a href={otherLink._blank} target='_blank' className='slider__item-phone font-medium'>
                            {removeHttps(otherLink._blank)}
                        </a>
                    </div>
                </div>
                {button.label.length === 0 ? '' :
                    <div className='slider__item-content-btns'>
                        {button.action === 'form' ?
                            <Button
                                onClick={openModal}
                                label={button.label}
                                skew={true}
                            />
                            : button.url.includes('http') ?
                                <a href={button.url} target='_blank'>
                                    <Button
                                        label={button.label}
                                        skew={true}
                                    />
                                </a> :
                                <Link to={button.url} spy={true} smooth={true}
                                    duration={2500}>
                                    <Button
                                        label={button.label}
                                        skew={true}
                                    />
                                </Link>
                        }
                    </div>
                }
            </div>
            {content.camera.length > 0 ?
                <Link onClick={openCamera} to='webcam'
                    className='slider__item-deadline-cam font-small'>{t('webcam')}</Link>
                : null
            }
            <div className='slider__item-deadline-wrap'>
                <div className='slider__item-deadline'>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M11.7951 0.678928C13.9021 1.57806 15.4252 3.09859 16.3214 5.18932C16.7729 6.24201 17 7.33758 17 8.49066C17 9.64396 16.7728 10.7488 16.3215 11.8016C15.425 13.8921 13.9019 15.4221 11.7949 16.3213C10.742 16.7705 9.6385 17 8.48603 17C7.33356 17 6.23861 16.7728 5.18647 16.3213C3.09708 15.4243 1.56708 13.8957 0.669222 11.8016C0.219306 10.7522 0 9.64396 0 8.49066C0 7.33758 0.219306 6.23845 0.669222 5.18932C1.56708 3.09523 3.09689 1.57567 5.18647 0.678928C6.23842 0.227375 7.33358 0 8.48603 0C9.63867 0 10.742 0.229543 11.7951 0.678928ZM12.2319 14.9728C13.3832 14.3012 14.2973 13.3929 14.9646 12.248C15.6358 11.0958 15.9681 9.83921 15.9681 8.49066C15.9681 7.14217 15.6336 5.89601 14.9644 4.75225C14.2951 3.60828 13.383 2.69904 12.2317 2.02745C11.0874 1.35983 9.83381 1.02295 8.48603 1.02295C7.13848 1.02295 5.89281 1.35786 4.74987 2.02745C3.60673 2.69706 2.69242 3.60634 2.02656 4.75227C1.36306 5.89404 1.03192 7.14217 1.03192 8.49069C1.03192 9.50449 1.22306 10.4826 1.61748 11.4016C2.01306 12.3239 2.54209 13.1267 3.20675 13.7917C3.87142 14.4565 4.66598 14.9821 5.58623 15.3819C6.5065 15.7819 7.47317 15.9771 8.48623 15.9771C9.83381 15.9771 11.0876 15.6404 12.2319 14.9728Z"
                            fill="white" />
                        <path
                            d="M8.87141 8.88378V3.93491C8.87141 3.63877 8.64728 3.3999 8.39002 3.3999C8.14942 3.3999 7.93359 3.63877 7.93359 3.93491V8.96019C7.93359 8.96978 7.95024 9.0081 7.95024 9.03665C7.93359 9.20865 7.97521 9.35195 8.07471 9.4667L10.5562 12.3232C10.7222 12.5144 11.0292 12.5144 11.1951 12.3232C11.386 12.1035 11.3734 11.7847 11.1951 11.578L8.87141 8.88378Z"
                            fill="white" />
                    </svg>
                    {deadline}
                </div>
                <span className='font-small'>{dataDeadline.name === 'passed' ? t('passed') : t('deadline')}</span>
            </div>
            <div className="scroll-lines">
                <span className="scroll-down-line"></span>
            </div>
        </div>
    );
};
export default WelcomeContentSingle2;