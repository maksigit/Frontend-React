import React, { Component } from 'react';
import Logo from '../../components/logo';
import LanguageSelector from '../../components/translation/language-selector';
import { withTranslation } from 'react-i18next';
import './header.scss';
import classNames from "classnames";
import { connect } from "react-redux";
import { getPhone } from "../footer/services/selectors";
import { getLanguage } from './services/selectors';
import CitySelectSaleDep from "../../components/city-select-sale-dep";
import PhoneNumber from "../../components/phone-number";
import {
    changeLanguage,
    fetchPhone,
    getCurrentCategory,
    getNameItemMenu,
    setCurrentCityFromLocation, setCurrentIndexCategories
} from './services/action'
import ItemMenu from "../../components/item-menu";

import {
    clearPageHousing, clearPageQuarters,
    fetchCoordinates,
  
    fetchItemByFilter,
    fetchItemByFilterQuarters,

    homeResetFilter,
   
} from '../../pages/home/services/action';
import { Element } from "react-scroll";


const languages = ['ru', 'ukr', 'eng'];

class Header extends Component {

    state = {
        mobileMenu: false
    };

    componentDidMount() {
        const language = this.props.location.pathname.substr(1);
        if (language.length === 0) {
            this.props.getCurrentCategory('living_complex')
        }

        if (!languages.includes(language)) return;

        this.props.changeLanguage(language);
    }

    openMobileMenu = () => {
        this.setState({ mobileMenu: true })
    };

    closeMobileMenu = () => {
        this.setState({ mobileMenu: false })
    };

    closeChooseLanguage = (e) => {
        if (e.target.className !== 'choose-language-btn') {
            document.querySelector('.choose-language').classList.remove('choose-language__open');
        }
    };

    render() {
        const { t, tel, language, changeLanguage } = this.props;
        const isMobile = window.innerWidth <= 768;

        const nav = [
            {
                url: 'living_complex',
                name: isMobile ? t('mobileMenu.living_complex') : t('RC'),
                categories: 'living_complex',
                exact: true,
                index: 0
            },
            {
                url: 'quarters',
                name: isMobile ? t('mobileMenu.living_quarters') : t('Quarters'),
                categories: 'quarters',
                exact: false,
                index: 1
            },
            {
                url: 'commerce',
                name: isMobile ? t('mobileMenu.commercial_property') : t('Commerce'),
                categories: 'commerce',
                exact: false,
                index: 2
            },
            {
                url: 'business_center',
                name: isMobile ? t('mobileMenu.business_centers') : t('Business centers'),
                categories: 'business_center',
                exact: false,
                index: 3
            },
            {
                url: 'shopping_center',
                name: isMobile ? t('mobileMenu.shopping_centers') : t('Shopping centers'),
                categories: 'shopping_center',
                exact: false,
                index: 4
            }, {
                url: 'link',
                name: isMobile ? t('mobileMenu.resale_Property') : t('Secondary'),
                categories: 'Secondary',
                exact: false
            },
        ];

        return (
            <>
            <div id="slider-router-animation" className="slider-router-animation"></div>
            <Element name="main-header">
                <header onClick={this.closeChooseLanguage} id="main-header" className='main-header'>
                    <Logo clearPageHousing={this.props.clearPageHousing} language={this.props.language} resetHeader={this.props.homeResetFilter} getCurrentCategory={this.props.getCurrentCategory} goHome={this.props.fetchItemByFilter} />
                   
                    <nav className={classNames('header-nav', {
                        'header-nav__active': this.state.mobileMenu,
                    })}>
                        <div className="mobile-logo">
                            <Logo language={this.props.language} resetHeader={this.props.homeResetFilter} getCurrentCategory={this.props.getCurrentCategory} goHome={this.props.fetchItemByFilter} />
                          
                        </div>
                        <div className='header-menu'>
                            {
                                nav.map((item) => {
                                    return (
                                        <ItemMenu
                                            clearPageHousing={this.props.clearPageHousing}
                                            clearPageQuarters={this.props.clearPageQuarters}
                                            fetchCoordinates={this.props.fetchCoordinates}
                                            setCurrentIndexCategories={this.props.setCurrentIndexCategories}
                                            closeMobileMenu={this.closeMobileMenu}
                                            getQuarters={this.props.fetchItemByFilterQuarters}
                                            getCurrentCategory={this.props.getCurrentCategory}
                                            language={this.props.language}
                                            getName={this.props.getNameItemMenu}
                                            changeCategory={this.props.fetchItemByFilter}
                                            key={item.url}
                                            item={item}
                                            dataQuarters={this.props.dataQuarters}
                                            data={this.props.data}
                                        />

                                      
                                    )
                                })
                            }
                        </div>
                        <div onClick={this.closeMobileMenu} className='close-mobile-menu'>
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2.36827" y="0.454102" width="25" height="2" transform="rotate(45 2.36827 0.454102)" fill="white" />
                                <rect width="25" height="2" transform="matrix(-0.707107 0.707107 0.707107 0.707107 18.6317 0.454102)" fill="white" />
                            </svg>
                        </div>
                        <div className='header-menu__contacts'>
                            <div className='title-real-estate'>
                                <div className='wrap-title-select-city'>
                                    <div className='title-real-estate-city'>{t('Sales Department')}</div>
                                    <CitySelectSaleDep
                                        currentCityFromLocation={this.props.currentCityFromLocation}
                                        changePhone={this.props.fetchPhone}
                                    />
                                </div>
                            </div>
                            {
                                tel &&
                                tel.slice(0, 2).map(element => {
                                    return (
                                        <PhoneNumber key={element._id} number={element.phone} />
                                    )
                                })
                            }
                        </div>
                        {isMobile && <LanguageSelector language={language} getNameItemMenu={this.props.getNameItemMenu} changeLanguage={changeLanguage} status={this.state.mobileMenu} />}
                    </nav>
                    {!isMobile && <LanguageSelector language={language} getNameItemMenu={this.props.getNameItemMenu} changeLanguage={changeLanguage} status={this.state.mobileMenu} />}
                    <div onClick={this.openMobileMenu} className='mobile-menu-btn'>
                        <svg width="30" height="14" viewBox="0 0 30 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="6" width="30" height="2" fill="white" />
                            <rect width="30" height="2" fill="white" />
                            <rect y="12" width="30" height="2" fill="white" />
                        </svg>
                    </div>
                </header>
            </Element>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        tel: getPhone(state),
        language: getLanguage(state),
        currentCategory: getCurrentCategory(state),
        currentCityFromLocation: state.headerReducer.currentCityFromLocation,
        dataQuarters: state.homeReducer.dataQuarters,
        data: state.homeReducer.data
    };
};

const mapDispatchToProps = {
    changeLanguage,

    getNameItemMenu,
    fetchPhone,
    getCurrentCategory,

    fetchItemByFilter,
    homeResetFilter,
    setCurrentCityFromLocation,
    setCurrentIndexCategories,
    fetchCoordinates,
    clearPageHousing,
    clearPageQuarters,

    fetchItemByFilterQuarters,

};


export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Header));
