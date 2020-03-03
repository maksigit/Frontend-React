import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/button/button';
import ItemResidential from '../../components/item-residential/item-residential';
import Select from 'react-select';
import classNames from 'classnames';
import {
    Link as LinkScroll,
    Element,

} from 'react-scroll';
import {MOBILE, URLS, categories_path, language_path, isDevice } from '../../helpers/helpers';
import {
    clearPageHousing,
    clearPageQuarters,
    currentItemId,
    fetchCoordinates,
    fetchItemByCity,
    fetchItemByFilter,
    fetchItemByFilterQuarters,
    fetchItemLoadMore,
    fetchWelcome,
    getMapId,
    getSeo, loadedImg,
    loadMore,
    loadMoreQuarters,
    setCity,
    setCityQuarters,
    setDistrict,
    setDistrictQuarters,
    setMapCity,
    setStatus,
    setStatusQuarters
} from './services/action';
import { quartersFetchData } from '../quarters-single/services/action';
import './home.scss';
import WithBg from '../../components/with-bg/with-bg';
import TabsHomeMap from '../../components/tabs-home-map';
import { closeForm, openForm, singleFetchData } from '../residential-single/services/action';
import Modal from '../../components/modal';
import TitleDescModalForm from '../../components/title-desc-modal-form';
import FormMain from '../../components/form-main';
import { getFormState } from '../residential-single/services/selectors';
import {
    changeLanguage,
    getCurrentCategory,
    getNameItemMenu,
    setCurrentCityFromLocation,
    setCurrentIndexCategories
} from '../../modules/header/services/action';
import { withTranslation } from 'react-i18next';
import ItemQuarters from '../../components/item-quarters';
import KadorrPreloader from '../../components/kadorr-preloader';
import WelcomeHome from '../../components/welcome-home';
import MetaTags from "../../components/meta-tags";

const declination = (number, titles) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

class Home extends Component {

    state = {
        loading: 0,
        modal: false,
        modalSent: false,
        filter: MOBILE < window.innerWidth
    };

    closeModal = () => {
        this.props.closeForm();
    };
    openModalSent = () => {
        document.querySelector('html').classList.add('scroll-off');
        this.setState({ modalSent: true });
    };

    closeModalSent = () => {
        document.querySelector('html').classList.remove('scroll-off');
        this.setState({ modalSent: false });
    };

    closeChooseLanguage = () => {
        document.querySelector('.choose-language').classList.remove('choose-language__open');
    };

    getItemByCity = e => {
        this.props.setMapCity(e.value);
        this.props.clearPageHousing();
        this.props.fetchItemByCity(e.value);
        this.props.setCity(e.value);
        this.props.fetchItemByFilter({ city: e.value });
        this.props.setCurrentCityFromLocation(e.value !== 'all' ? e.value : this.props.currentCityFromLocation)

    };

    getItemByDistrict = e => {
        this.props.clearPageHousing();
        this.props.setDistrict(e.value);
        this.props.fetchItemByFilter({ district: e.value });
        this.props.fetchCoordinates(this.props.currentCategory)
    };

    getItemByStatus = e => {
        this.props.clearPageHousing();
        this.props.setStatus(e.value);
        this.props.fetchItemByFilter({ status: e.value });
        this.props.fetchCoordinates(this.props.currentCategory)
    };

    getItemByCityQuarters = e => {
        this.props.clearPageQuarters();
        this.props.fetchItemByCity(e.value);
        this.props.setCityQuarters(e.value);
        this.props.fetchItemByFilterQuarters({ city: e.value });
        this.props.setCurrentCityFromLocation(e.value !== 'all' ? e.value : this.props.currentCityFromLocation)
        this.props.fetchCoordinates(this.props.currentCategory)
    };

    getItemByDistrictQuarters = e => {
        this.props.clearPageQuarters();
        this.props.setDistrictQuarters(e.value);
        this.props.fetchItemByFilterQuarters({ district: e.value });
        this.props.fetchCoordinates(this.props.currentCategory)
    };

    getItemByStatusQuarters = e => {
        this.props.clearPageQuarters();
        this.props.setStatusQuarters(e.value);
        this.props.fetchItemByFilterQuarters({ status: e.value });
    };

    loadMoreItem = e => {
        this.props.loadMore();
     
        this.props.fetchItemLoadMore({});
    
    };

    loadMoreItemQuarters = e => {
        this.props.loadMoreQuarters();

        this.props.fetchItemByFilterQuarters({})
    };

    componentDidMount() {

        const pathUrl = this.props.match.url;
        const { category, language: lang } = this.props.match.params;

        if (language_path[lang] && categories_path[category] === undefined) {
            this.props.history.push('/404');
            return;
        }

        let language = '';
        if (this.props.match.path.substr(1) === '') {
            language = this.props.language
        } else if (this.props.match.path.substr(1).length === 2) {
            language = this.props.match.path.substr(1);
        } else {
            language = this.props.match.params.language;
            this.props.getCurrentCategory(this.props.match.params.category)
        }

        this.props.changeLanguage(language);
        this.props.i18n.init({
            lng: language,
        });

        if (pathUrl === '/') {
            if (this.props.data.length === 0) {
            
                this.props.fetchItemByFilter({})
            }
        } else if (pathUrl.includes('quarters') && this.props.dataQuarters.length === 0) {
            this.props.fetchItemByFilterQuarters({});
            document.querySelector('#main-header').classList.remove('main-header__scroll');
            document.querySelector('.choose-language').classList.remove('main-header__scroll');
        } else {
            this.props.fetchItemByFilter({})
        }

        if (pathUrl === '/') {
            this.props.getNameItemMenu('ЖИЛЫЕ КОМПЛЕКСЫ');
        } else {
            this.props.getNameItemMenu(URLS[pathUrl.substr(1)]);
        }

        setTimeout(() => {
            this.props.fetchCoordinates(this.props.currentCategory);
        }, 300);

        this.props.fetchWelcome();
        this.props.fetchItemByCity('all');
        this.props.getSeo();

        this.props.i18n.on('languageChanged', (language) => {
            this.props.fetchItemByFilter({});
            this.props.fetchWelcome(this.props.currentCategory);
            this.props.fetchCoordinates(this.props.currentCategory);
            this.props.fetchItemByCity(this.props.currentCityFromLocation);
            this.props.fetchItemByFilterQuarters({});

            this.props.getSeo();
            if (this.props.match.params.category) {
                this.props.history.push(`/${language}/${this.props.match.params.category}`);
            }
        });

        window.addEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // ПРОВЕРИТЬ НА ОПТИПИЗАЦИЮ ЧТО БІ НЕБІЛО ЛИШНИЗ ЗАПРОССОВ
        if (this.props.currentCategory !== prevProps.currentCategory) {
            // this.props.fetchWelcome();
            this.props.getSeo();
            this.props.clearPageHousing()
            this.props.fetchItemByFilter({})
        }
    }

    toggleFilter = (e) => {
        e.currentTarget.lastChild.classList.toggle('rotate');
        this.setState({
            filter: !this.state.filter
        })
    };

    componentWillUnmount() {
        this.props.i18n.off('languageChanged');
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll(event) {
        let elem = document.querySelector(".filter");
        if (elem.offsetTop > window.scrollY + 100) {
            let blocks1 = document.querySelectorAll(".animated.animatedFadeInUp");
            if (blocks1) {
                blocks1.forEach(function (item, i, arr) {
                    item.classList.add('fadeInUp');
                });
            }
            let blocks2 = document.querySelector(".item-img-cont.animated.animatedFadeInRight");
            if (blocks2) {
                blocks2.classList.add('fadeInRight');
            }
            let blocks3 = document.querySelectorAll(".basic-single.animated.animatedFadeInLeft");
            if (blocks3) {
                blocks3.forEach(function (item, i, arr) {
                    item.classList.add('in-left');
                });
            }
            let blocks4 = document.querySelector(".item-residential__wrap-info.animated.animatedFadeInDown");
            if (blocks4) {
                blocks4.classList.add('fadeInUp');
            }
            let blocks5 = document.querySelectorAll(".btn-temp-class.animated.animatedFadeInRight");
            if (blocks5) {
                blocks5.forEach(function (item, i, arr) {
                    item.classList.add('fadeInRight');
                });
            }
        }
        let elem0 = document.querySelectorAll(".wrap-item-residential.item-custom");
        let elem1 = document.querySelectorAll(".wrap-item-residential.item-custom .item-img-cont.animated.animatedFadeInRight");
        if (elem1) {
            elem1.forEach(function (item, i, arr) {
                let temp = elem0[i];
                if (window.scrollY + 950 > temp.offsetTop) {
                    item.classList.add('fadeInRight');
                    temp.classList.remove('item-custom');
                }
            });
        }
        let elem2 = document.querySelectorAll(".wrap-item-residential.item-custom1 .item-residential__wrap-info.animated.animatedFadeInDown");
        if (elem2) {
            elem2.forEach(function (item, i, arr) {
                if (window.scrollY + 950 > item.offsetTop) {
                    item.classList.add('fadeInUp');
                    item.closest('.wrap-item-residential').classList.remove('item-custom1');
                }
            });
        }

    }

    customStyles = {
        option: (styles, state) => ({
            ...styles,
            "backgroundColor": '',
            "border": 'none',
            "color": '#474747',
            '&:hover': {
                color: '#BEA972'
            }
        }),
        control: (base, state) => ({
            ...base,
            "border": 'none',
            "boxShadow": 'none',
            '&:hover': {
                background: 'transparent'
            }
        }),
        menu: base => ({
            ...base,
            // override border radius to match the box
            borderRadius: 0,
            background: 'fafafa',
            // beautify the word cut by adding a dash see https://caniuse.com/#search=hyphens for the compatibility
            hyphens: 'auto',
            // kill the gap
            marginTop: 0,
            textAlign: 'left',
            // prevent menu to scroll y
            wordWrap: 'break-word',
            borderBottom: '1px solid #E1E1E1',
            boxShadow: 'none'
        }),
        menuList: base => ({
            ...base,
            // kill the white space on first and last option
            padding: 0,
            border: 'none',
            background: 'fafafa'
        })
    };

    limits_device_quarters = {
        'desktop': 9,
        'tablet': 8,
        'mobile': 6
    };

    limits_device_living = {
        'desktop': 7,
        'tablet': 7,
        'mobile': 6
    };

    showBtnQuarters = (disableButton, length) => {
        if (this.props.countItemsQuarters < this.limits_device_quarters[isDevice()]) {
            return null;
        }
        if (disableButton > this.limits_device_quarters[isDevice()] && disableButton !== this.props.dataQuarters.length) {
            return (<Button
                label={this.props.t('more')}
                fullWith={true}
                onClick={this.loadMoreItemQuarters}
            />)
        } else {
            return ''
        }
    };
    showBtn = (disableButton, length) => {
        if (this.props.countItems < this.limits_device_living[isDevice()]) {
            return null;
        } else if (disableButton > this.limits_device_living[isDevice()] && disableButton !== this.props.data.length) {
         
            return (<Button
                label={this.props.t('more')}
                fullWith={true}
                onClick={this.loadMoreItem}
            />)
        }
    };



    render() {
        const data = this.props.data;
        const dataQuarters = this.props.dataQuarters;
        const coordinates = this.props.coordinates;
        const welcome = this.props.welcome;
        const getMapId = this.props.getMapId;
        const t = this.props.t;
        const seo = this.props.seo;
        let districts = [];
        this.props.districts.map(item => {
            return (
                districts.push({
                    value: item._id,
                    label: item.content.main.name
                })
            );
        });
        districts = [...districts, { value: 'all', label: t('all') }];

        return (

            <div onClick={this.closeChooseLanguage} className="main-home">
                <MetaTags seo={{
                    title: '',
                    description: '',
                    seoTitle: seo.title,
                    seoDescription: seo.description
                }} />
                {
                    !welcome ? <KadorrPreloader /> :
                        <WelcomeHome
                            t={t}
                            click={getMapId}
                            openForm={this.props.openForm}
                            data={welcome}
                            loadedImgWelcome={this.props.loadedImg}
                        />
                }
                {this.props.currentCategory === 'quarters' ?
                    <Element name="screen1" className="screen-filter">
                        <div className="filter">
                            <div className="filter__right-map-point animated animatedFadeInUp">
                                <svg width="14" height="16" viewBox="0 0 14 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M0 5.38067C0 2.41377 2.46728 0 5.5 0C8.53269 0 10.9999 2.41377 11 5.38067C11 8.65327 7.11177 11.8202 6.09994 12.6444C5.97335 12.7475 5.89178 12.8139 5.86848 12.8393C5.67201 13.0534 5.32835 13.0538 5.13152 12.8393C5.10822 12.8139 5.02665 12.7475 4.90006 12.6444C3.88823 11.8202 0 8.65327 0 5.38067ZM2.73284 5.38067C2.73284 6.87341 3.97416 8.08784 5.5 8.08784C7.02581 8.08784 8.26713 6.87344 8.26713 5.3807C8.26713 3.88796 7.02581 2.67353 5.5 2.67353C3.97419 2.67353 2.73284 3.88793 2.73284 5.38067Z"
                                        fill="#BEA972"
                                    />
                                </svg>
                                <LinkScroll to="home-map" className="font-small__upper" spy={true} smooth={true}
                                    duration={2500}>{t('look at the map')}</LinkScroll>
                            </div>
                            <div className="filter__left">
                                <div className="animated animatedFadeInUp filter__title">{t(this.props.currentCategory)}</div>
                                <div className='filter__toggle font-small' onClick={this.toggleFilter}>
                                    {t('filter')}
                                    <svg width="6" height="4" viewBox="0 0 6 4" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3 4L0 0.181818L6 0.181818L3 4Z"
                                            fill="#BEA972" />
                                    </svg>
                                </div>
                                <div className={classNames("wrap-select on-quarters", {
                                    'wrap-select__open': this.state.filter
                                })}>
                                    {
                                        window.innerWidth < MOBILE ?
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                options={[
                                                    { value: 'kiev', label: t('kiev') },
                                                    { value: 'odessa', label: t('odessa') },
                                                    { value: 'all', label: t('all') }
                                                ]}
                                                styles={this.customStyles}
                                                placeholder={t('city')}
                                                onChange={this.getItemByCityQuarters}
                                                isSearchable={false}
                                            /> :
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                options={[
                                                    { value: 'kiev', label: t('kiev') },
                                                    { value: 'odessa', label: t('odessa') },
                                                    { value: 'all', label: t('all') }
                                                ]}
                                                styles={this.customStyles}
                                                placeholder={t('city')}
                                                onChange={this.getItemByCityQuarters}
                                            />
                                    }
                                    {
                                        window.innerWidth < MOBILE ?
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                options={districts}
                                                styles={this.customStyles}
                                                placeholder={t('location')}
                                                onChange={this.getItemByDistrictQuarters}
                                                isSearchable={false}
                                            /> :
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                options={districts}
                                                styles={this.customStyles}
                                                placeholder={t('location')}
                                                onChange={this.getItemByDistrictQuarters}
                                            />
                                    }
                                </div>
                            </div>
                            <div className="filter__right">
                                <div className="btn-temp-class animated animatedFadeInRight">
                                    {this.state.filter &&
                                        <Button
                                            label={this.props.countItemsQuarters + ' ' + declination(this.props.countItemsQuarters, [`${t('project')}`, `${t('the project')}`, `${t('projects')}`])}
                                            skew={true}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </Element> :
                    <Element name="screen1" className="screen-filter">
                        <div className="filter">
                            <div className="filter__right-map-point animated animatedFadeInUp">
                                <svg width="14" height="16" viewBox="0 0 14 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M0 5.38067C0 2.41377 2.46728 0 5.5 0C8.53269 0 10.9999 2.41377 11 5.38067C11 8.65327 7.11177 11.8202 6.09994 12.6444C5.97335 12.7475 5.89178 12.8139 5.86848 12.8393C5.67201 13.0534 5.32835 13.0538 5.13152 12.8393C5.10822 12.8139 5.02665 12.7475 4.90006 12.6444C3.88823 11.8202 0 8.65327 0 5.38067ZM2.73284 5.38067C2.73284 6.87341 3.97416 8.08784 5.5 8.08784C7.02581 8.08784 8.26713 6.87344 8.26713 5.3807C8.26713 3.88796 7.02581 2.67353 5.5 2.67353C3.97419 2.67353 2.73284 3.88793 2.73284 5.38067Z"
                                        fill="#BEA972"
                                    />
                                </svg>
                                <LinkScroll to="home-map" className="font-small__upper" spy={true} smooth={true}
                                    duration={2500}>{t('look at the map')}</LinkScroll>
                            </div>
                            <div className="filter__left">
                                <div className="filter__title animated animatedFadeInUp">{t(this.props.currentCategory)}</div>
                                <div className='filter__toggle font-small' onClick={this.toggleFilter}>
                                    {t('filter')}
                                    <svg width="6" height="4" viewBox="0 0 6 4" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3 4L0 0.181818L6 0.181818L3 4Z"
                                            fill="#BEA972" />
                                    </svg>
                                </div>
                                <div className={classNames("wrap-select", {
                                    'wrap-select__open': this.state.filter
                                })}>
                                    {
                                        window.innerWidth < MOBILE ?
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                options={[
                                                    { value: 'kiev', label: t('kiev') },
                                                    { value: 'odessa', label: t('odessa') },
                                                    { value: 'all', label: t('all') }
                                                ]}
                                                styles={this.customStyles}
                                                placeholder={t('city')}
                                                onChange={this.getItemByCity}
                                                isSearchable={false}
                                            /> : <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                options={[
                                                    { value: 'kiev', label: t('kiev') },
                                                    { value: 'odessa', label: t('odessa') },
                                                    { value: 'all', label: t('all') }
                                                ]}
                                                styles={this.customStyles}
                                                placeholder={t('city')}
                                                onChange={this.getItemByCity}
                                            />
                                    }
                                    {
                                        window.innerWidth < MOBILE ?
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                options={districts}
                                                styles={this.customStyles}
                                                placeholder={t('location')}
                                                onChange={this.getItemByDistrict}
                                                isSearchable={false}
                                            /> : <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                options={districts}
                                                styles={this.customStyles}
                                                placeholder={t('location')}
                                                onChange={this.getItemByDistrict}
                                            />
                                    }
                                    {
                                        window.innerWidth < MOBILE ?
                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                options={[
                                                    { value: 'passed', label: t('passed') },
                                                    { value: 'sale', label: t('sale') },
                                                    { value: 'construction', label: t('construction') },
                                                    { value: 'all', label: t('all') }
                                                ]}
                                                styles={this.customStyles}
                                                placeholder={t('sale')}
                                                onChange={this.getItemByStatus}
                                                isSearchable={false}
                                            /> : <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                options={[
                                                    { value: 'passed', label: t('passed') },
                                                    { value: 'sale', label: t('sale') },
                                                    { value: 'construction', label: t('construction') },
                                                    { value: 'all', label: t('all') }
                                                ]}
                                                styles={this.customStyles}
                                                placeholder={t('sale')}
                                                onChange={this.getItemByStatus}
                                            />
                                    }
                                </div>
                            </div>
                            <div className="filter__right">
                                <div className="btn-temp-class animated animatedFadeInRight">
                                    {this.state.filter &&
                                        <Button
                                            label={this.props.countItems + ' ' + declination(this.props.countItems, [`${t('project')}`, `${t('the project')}`, `${t('projects')}`])}
                                            skew={true}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </Element>
                }
                <Element name="screen2">
                    <div className="main-home__items">
                        {this.props.currentCategory === 'quarters' ? dataQuarters.length > 0 ?
                            dataQuarters.map((item, index) => {
                                return (
                                    <ItemQuarters
                                        link={item.data.main.url}
                                        id={item._id}
                                        key={item._id}
                                        index={index}
                                        history={this.props.history}
                                        quartersFetchData={this.props.quartersFetchData}
                                        deadline={item.data.main.deadline}
                                        status={item.status.info.label}
                                        title={item.data.main.title}
                                        location={item.data.address.street}
                                        img={item.data.main.image[0].path}
                                        language={this.props.language}
                                        t={t}
                                        currentItemId={this.props.currentItemId}
                                    />
                                );
                            })
                            : <div className='no-matches-found title-section animated animatedFadeInUp fadeInUp'>
                                {t('no matches found')}</div> : data.length > 0 ? data.map((item, index) => {
                                    return (
                                        <ItemResidential
                                            currentCategory={this.props.currentCategory}
                                            link={item.url}
                                            index={index}
                                            key={item._id}
                                            history={this.props.history}
                                            singleFetchData={this.props.singleFetchData}
                                            id={item._id}
                                            item={item}
                                            deadline={item.content.deadline}
                                            status={item.status.name}
                                            title={item.content.title}
                                            description={index % 4 === 0 && window.innerWidth > 769 ? item.content.slider.desc : ''}
                                            location={item.content.address}
                                            revers={index % 14 === 0}
                                            fullWith={(index === 0) || this.props.currentCategory === 'business_center' || (window.innerWidth < 769 ? (index % 7 === 0) : (index % 7 === 0))}
                                            img={(index === 0) || (window.innerWidth < 769 ? (index % 5 === 0) : (index % 7 === 0)) ? item.other.full_width_photo[0] : item.content.photoPrewie[0]}
                                            language={this.props.language}
                                            t={t}
                                            currentItemId={this.props.currentItemId}
                                        />
                                    );
                                }) : <div className='no-matches-found title-section animated animatedFadeInUp fadeInUp'>
                                    {t('no matches found')}</div>
                        }
                    </div>
                </Element>
                <div className="m-top-70">
                    {this.props.currentCategory === 'quarters' ?
                        this.showBtnQuarters(this.props.countItemsQuarters) :
                        this.showBtn(this.props.countItems)
                    }
                </div>

                <Element name="screen3">
                    <div id="home-map" className="home-location-section">
                        {
                            !coordinates ? <KadorrPreloader /> :
                                <TabsHomeMap
                                    t={t}
                                    setCurrentIndexCategories={this.props.setCurrentIndexCategories}
                                    idMarker={this.props.selectMap}
                                    item={coordinates}
                                    mapInitCity={this.props.mapInitCity}
                                    arrows={false}
                                    currentCategory={this.props.currentCategory}
                                    currentIndexCategories={this.props.currentIndexCategories}
                                    language={this.props.language}
                                    getCoordinates={this.props.fetchCoordinates}
                                    currentCityFromLocation={this.props.currentCityFromLocation}
                                    currentItemId={this.props.getCurrentItemId}
                                />
                        }
                    </div>
                </Element>
                {
                    this.props.formModal &&
                    <Modal modalClose={this.props.closeForm}>
                        <TitleDescModalForm title={t('We are always ready to answer any of your questions.')}
                            desc={t('Leave your details and write a question of interest. Our managers will contact you as soon as possible and will provide expert advice.')}
                        />
                        <FormMain
                            t={t}
                            defaultValue={this.props.currentCityFromLocation}
                            closeModal={this.closeModal}
                            success={this.openModalSent}
                            source="Home Page"
                        />
                    </Modal>
                }
                {
                    this.state.modalSent &&
                    <Modal modalClose={this.closeModalSent}>
                        <div className="sent-successful">
                            <div
                                className="sent-successful__title title-section">{t('Your application has been sent successfully')}
                            </div>
                            <div className="sent-successful__svg">
                                <svg width="24" height="19" viewBox="0 0 24 19" fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.99987 14.6001L2.39987 9.00013L0.533203 10.8668L7.99987 18.3335L23.9999 2.33346L22.1332 0.466797L7.99987 14.6001Z"
                                        fill="#BEA972"
                                    />
                                </svg>
                            </div>
                            <div className="sent-successful__desc font-medium">{t('Please expect a call within 15 minutes. Thanks for trust')}
                            </div>
                        </div>
                    </Modal>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        formModal: getFormState(state),
        data: state.homeReducer.data,
        language: state.headerReducer.language,
        coordinates: state.homeReducer.coordinates,
        welcome: state.homeReducer.welcome,
        selectMap: state.homeReducer.selectMap,
        title: state.headerReducer.nameMenu,
        districts: state.homeReducer.districts,
        currentCategory: state.headerReducer.currentCategory,
        dataQuarters: state.homeReducer.dataQuarters,
        currentCityFromLocation: state.headerReducer.currentCityFromLocation,
        currentIndexCategories: state.headerReducer.currentIndexCategories,
        getCurrentItemId: state.homeReducer.currentItemId,
        mapInitCity: state.homeReducer.mapInitCity,
        seo: state.homeReducer.dataSeo,
        disableButton: state.homeReducer.dataLength,
        disableButtonQuarters: state.homeReducer.dataQuartersLength,
        countItems: state.homeReducer.countItems,
        countItemsQuarters: state.homeReducer.countItemsQuarters,
        loadedImgWelcome: state.homeReducer.loadedImgWelcome
    };
};

const mapDispatchToProps = {
    fetchCoordinates,
    fetchWelcome,
    openForm,
    closeForm,
    quartersFetchData,
    loadMore,
    loadMoreQuarters,
    getMapId,
    singleFetchData,
    getNameItemMenu,
    fetchItemByCity,
    setCity,
    setStatus,
    setDistrict,
    setCityQuarters,
    setStatusQuarters,
    setDistrictQuarters,
    fetchItemByFilter,
    fetchItemByFilterQuarters,
    fetchItemLoadMore,
    clearPageHousing,
    clearPageQuarters,
    changeLanguage,
    setCurrentCityFromLocation,
    getCurrentCategory,
    setCurrentIndexCategories,
    currentItemId,
    setMapCity,
    getSeo,
    loadedImg
};

export default connect(mapStateToProps, mapDispatchToProps)(WithBg(withTranslation()(Home)));