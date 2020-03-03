import React from 'react';
import {Link} from 'react-router-dom';
import LogoIcon from './logo.svg'
import './logo.scss';
import {Link as LinkScroll} from "react-scroll";
import {clearPageHousing} from "../../pages/home/services/action";

const Logo = ({resetHeader, getCurrentCategory, goHome, language, clearPageHousing}) => {

    const handleCategory = () => {
        clearPageHousing();
        getCurrentCategory('living_complex');
        resetHeader();
        goHome('living_complex');
    };

    let linkLanguage = '';

    if (language === 'ru') {
        linkLanguage = ''
    } else if (language === 'ua') {
        linkLanguage = 'ua'
    } else {
        linkLanguage = 'en'
    }

    return (
        <LinkScroll to="main-header" spy={true} smooth={true}
                    duration={2500}>
            <Link onClick={handleCategory} to={`/${linkLanguage}`} className='logo'>
                <img src={LogoIcon} alt="logo"/>
            </Link>
        </LinkScroll>

    );
};
export default Logo;
