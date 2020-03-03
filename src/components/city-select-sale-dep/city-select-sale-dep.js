import React, {useEffect, useState} from 'react';
import {withTranslation} from 'react-i18next';
import '../city-select/city-select.scss'

const CitySelectSaleDep = (props) => {

    const {currentCityFromLocation} = props;

    const [local, setLocal] = useState(currentCityFromLocation);

    useEffect(() => {

        if (currentCityFromLocation !== local) {
            setLocal(currentCityFromLocation)

        }
        props.changePhone(currentCityFromLocation)

    }, [currentCityFromLocation]);

    const t = props.t;

    const openLanguage = e => {
        e.stopPropagation();
        e.preventDefault();
        e.target.nextElementSibling.classList.toggle('city-select__open');
        e.target.classList.toggle('rotate');
    };

    const chooseLanguage = e => {
        e.preventDefault();

        setLocal(e.target.previousElementSibling.value);

        e.currentTarget.classList.toggle('city-select__open');
        e.currentTarget.previousElementSibling.classList.toggle('rotate');
       props.changePhone(e.target.previousElementSibling.value)
    };

    return (
        <div className='wrap-city-select'>
            <div className='city-select-btn' onClick={openLanguage}>
                {local === 'kiev' ? t('kiev lng') : t('odessa lng')}
            <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3 4L0 0.181818L6 0.181818L3 4Z" fill="white"/>
            </svg>
            </div>
            <div className='city-select' onClick={chooseLanguage}>
                {local !== 'kiev' &&
                <label htmlFor="lang-en" className='city-select__label'>
                    <input className='city-select__input' id='lang-en' type="radio" value="kiev" name="language"
                           />
                    <span className='font-small'>{t('kiev lng')}</span>
                </label>
                }
                {local !== 'odessa' &&
                <label htmlFor="lang-uk" className='city-select__label'>
                    <input className='city-select__input' id='lang-uk' type="radio" value="odessa" name="language"
                           defaultChecked={true}
                    />
                    <span className='font-small'>{t('odessa lng')}</span>
                </label>
                }
            </div>
        </div>
    );
};

export default withTranslation()(CitySelectSaleDep);
