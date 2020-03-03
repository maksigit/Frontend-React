import React from 'react';
import {useTranslation} from 'react-i18next';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import './language-selector.scss'
import classNames from "classnames";
import {categories} from '../../helpers/helpers'

const LanguageSelector = (props) => {
    const {status, language, getNameItemMenu} = props;

    const {i18n} = useTranslation();

    const openLanguage = e => {
        e.preventDefault();
        e.target.nextElementSibling.classList.toggle('choose-language__open');
    };

    const chooseLanguage = e => {
        e.preventDefault();
        const language = e.target.previousElementSibling.value;
        props.changeLanguage(language);
        i18n.changeLanguage(language);
        let new_url = '';
        new_url += props.location.pathname;

        // if (new_url.includes('ru')) {
        //     new_url = new_url.replace('ru', language);
        // } else if (new_url.includes('ua')) {
        //     new_url = new_url.replace('ua', language);
        // } else if (new_url.includes('en')) {
        //     new_url = new_url.replace('en', language);
        // } else {
        //     new_url = new_url + language;
        // }

        getNameItemMenu(categories[language][new_url.substr(1)]);

        e.currentTarget.classList.toggle('choose-language__open');
    };

    return (
        <div className={classNames('wrap-choose-language', {
            'wrap-choose-language__active': status,
        })}>
            <div className='choose-language-btn' onClick={openLanguage}>{language}</div>
            <div className='choose-language' onClick={chooseLanguage}>
                {language !== 'ua' &&
                <Link to={`/ua`}>
                    <label htmlFor="lang-uk" className='choose-language__label'>
                        <input defaultChecked={language === 'ua' ? true : false} className='choose-language__input'
                               id='lang-uk' type="radio" value="ua" name="language"
                        />
                        <span className='font-small'>UA</span>
                    </label>
                </Link>
                }
                {language !== 'en' &&
                <Link to={`/en`}>
                    <label htmlFor="lang-en" className='choose-language__label'>
                        <input defaultChecked={language === 'en' ? true : false} className='choose-language__input'
                               id='lang-en' type="radio" value="en" name="language"
                        />
                        <span className='font-small'>EN</span>
                    </label>
                </Link>
                }
                {language !== 'ru' &&
                <Link to={`/`}>
                    <label htmlFor="lang-ru" className='choose-language__label'>
                        <input defaultChecked={language === 'ru' ? true : false} className='choose-language__input'
                               id='lang-ru' type="radio" value="ru" name="language"/>
                        <span className='font-small'>RU</span>
                    </label>
                </Link>
                }
            </div>

            <div className='choose-language mobile' onClick={chooseLanguage}>

                <Link to={`/`}>
                    <label htmlFor="lang-ru" className='choose-language__label'>
                        <input defaultChecked={language === 'ru' ? true : false} className='choose-language__input'
                               id='lang-ru' type="radio" value="ru" name="language"/>
                        <span className='font-small'>RU</span>
                    </label>
                </Link>

                <Link to={`/ua`}>
                    <label htmlFor="lang-uk" className='choose-language__label'>
                        <input defaultChecked={language === 'ua' ? true : false} className='choose-language__input'
                               id='lang-uk' type="radio" value="ua" name="language"
                        />
                        <span className='font-small'>UA</span>
                    </label>
                </Link>

                <Link to={`/en`}>
                    <label htmlFor="lang-en" className='choose-language__label'>
                        <input defaultChecked={language === 'en' ? true : false} className='choose-language__input'
                               id='lang-en' type="radio" value="en" name="language"
                        />
                        <span className='font-small'>EN</span>
                    </label>
                </Link>

            </div>
        </div>
    );
};

export default withRouter(LanguageSelector);
