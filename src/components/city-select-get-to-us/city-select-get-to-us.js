import React, {useEffect, useState} from 'react';
import {withTranslation} from 'react-i18next';

import './city-select-get-to-us.scss'

const CitySelectGetToUs = (props) => {
    const {currentCityFromLocation, getCurrentCity} = props;
    const [local, setLocal] = useState(currentCityFromLocation);

    useEffect(() => {

        if (currentCityFromLocation !== local) {
            setLocal(currentCityFromLocation)
        }

    }, [currentCityFromLocation]);

    const t = props.t;

    const openLanguage = e => {
        document.body.addEventListener('click', function (e) {
            if (e.target.closest('.wrap-city-select-get-to-us') === null) {
                if (document.querySelector('.city-select-get-to-us')) {
                    document.querySelector('.city-select-get-to-us').classList.remove('city-select-get-to-us__open')
                }
            }
        })
        e.preventDefault();
        e.target.nextElementSibling.classList.toggle('city-select-get-to-us__open');
        e.target.classList.toggle('rotate');
    };

    const chooseLanguage = e => {
        e.preventDefault();

        props.setCurrentCityFromLocation(e.target.previousElementSibling.value);
        setLocal(e.target.previousElementSibling.value);
        getCurrentCity(e.target.previousElementSibling.value);
        e.currentTarget.classList.toggle('city-select-get-to-us__open');
        e.currentTarget.previousElementSibling.classList.toggle('rotate');
    };

    return (
        <div className='wrap-city-select-get-to-us'>
            <div className='city-select-btn' onClick={openLanguage}>
                {local === 'kiev' ? t('kiev lng') : t('odessa lng')}
            <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3 4L0 0.181818L6 0.181818L3 4Z" fill="white"/>
            </svg>
            </div>
            <div className='city-select-get-to-us' onClick={chooseLanguage}>
                {local !== 'kiev' &&
                <label htmlFor="lang-en" className='city-select-get-to-us__label'>
                    <input className='city-select-get-to-us__input' id='lang-en' type="radio" value="kiev" name="language"
                           />
                    <span className='font-small'>{t('kiev lng')}</span>
                </label>
                }
                {local !== 'odessa' &&
                <label htmlFor="lang-uk" className='city-select-get-to-us__label'>
                    <input className='city-select-get-to-us__input' id='lang-uk' type="radio" value="odessa" name="language"
                           defaultChecked={true}
                    />
                    <span className='font-small'>{t('odessa lng')}</span>
                </label>
                }
            </div>
        </div>
    );
};

export default withTranslation()(CitySelectGetToUs);
