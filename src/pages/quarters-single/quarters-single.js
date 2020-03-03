import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from "react-helmet/es/Helmet";
import {withTranslation} from 'react-i18next'
import {NavLink, withRouter} from 'react-router-dom';
import {Link as LinkScroll, animateScroll as scroll} from 'react-scroll'
import {categories_path, language_path, translate_language} from '../../helpers/helpers'
import {
    quartersFetchData
} from './services/action';

import './quarters-single.scss'
import ItemQuartersFirst from "../../components/item-quarters-first";
import ItemQuartersResidential from "../../components/item-quarters-residential";
import {Element} from "react-scroll";
import TabsQuartersMap from "../../components/tabs-quarters-map";
import KadorrPreloader from "../../components/kadorr-preloader";
import {Breadcrumbs, BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import {changeLanguage, getCurrentCategory} from "../../modules/header/services/action";
import {currentItemId} from "../home/services/action";
import {singleFetchData} from '../residential-single/services/action';
import MetaTags from "../../components/meta-tags";
import WithBg from "../../components/with-bg/with-bg";

class QuartersSingle extends Component {

    refMainQuarters = React.createRef();


    componentDidMount() {
        window.scrollTo(0, 0);
        var mainHeader = document.querySelector('#main-header');
        var chooseLanguage = document.querySelector('.choose-language');
        mainHeader.classList.add('main-header__scroll');
        chooseLanguage.classList.add('main-header__scroll');
        const {id, language, currentcategory} = this.props.match.params;

        this.props.changeLanguage(language);
        this.props.i18n .init({
            lng: language,
        });

        this.props.getCurrentCategory('quarters');

        if (this.props.section === null) {
            this.props.quartersFetchData({id, language: translate_language(language)});
        }

        if (this.props.dataQuarters.length !== 0) {
            this.refMainQuarters.current.classList.add('main-quarters-done');
        }


        this.props.i18n.on('languageChanged', (language) => {
            const url = this.props.section.href[translate_language(language)];
            this.props.quartersFetchData({id: url, language: translate_language(language)});
            this.props.history.push(`/${language}/quarters/${url}`);
        });

        document.querySelector('body').classList.add('done');
        setTimeout(() => {
            document.querySelector('header').classList.add('main-header__scroll');
            document.querySelector('.choose-language').classList.add('main-header__scroll');
            if (this.props.dataQuarters.length === 0) {
                this.refMainQuarters.current.classList.add('main-quarters-done');
            }
        }, 500);

        window.addEventListener('scroll', function() {
            if (window.pageYOffset === 0) {
                mainHeader.classList.add('main-header__scroll');
                chooseLanguage.classList.add('main-header__scroll');
            }
        });
    }

    componentWillUnmount() {
        this.props.i18n.off('languageChanged');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(this.props.messageErrorQuarters) {
            this.props.history.push('/404');
        }
    }

    closeChooseLanguage = () => {
        document.querySelector('.choose-language').classList.remove('choose-language__open');
    };

    changeCategory = () => {
        this.props.getCurrentCategory('living_complex')
    };

    render() {
        const {section, complex, t} = this.props;
        return (
            <>
            <div ref={this.refMainQuarters} onClick={this.closeChooseLanguage} className='main-quarters'>
                {
                    !section ? <KadorrPreloader /> :
                        <div>
                            <BreadcrumbsItem onClick={this.changeCategory} to="/">{t('main')}</BreadcrumbsItem>
                            <BreadcrumbsItem to={`/${this.props.language}/${this.props.currentCategory}`}>{t(this.props.currentCategory)}</BreadcrumbsItem>
                            <BreadcrumbsItem to={`/${this.props.language}/${this.props.currentCategory}/district`}>{section.main.title}</BreadcrumbsItem>
                            <div className="breadcrumbs">
                                <Breadcrumbs
                                    separator={<b> &bull; </b>}
                                    item={NavLink}
                                    finalItem={'span'}
                                />
                            </div>
                            <MetaTags seo={{
                                title: section.main.title,
                                description: section.main.description,
                                seoTitle: section.seo.title,
                                seoDescription: section.main.description
                            }} />
                            <div className='filter'>
                                <div className='filter__title'>{section.main.title}</div>
                                <div className='filter__right-map-point'>
                                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M0 5.38067C0 2.41377 2.46728 0 5.5 0C8.53269 0 10.9999 2.41377 11 5.38067C11 8.65327 7.11177 11.8202 6.09994 12.6444C5.97335 12.7475 5.89178 12.8139 5.86848 12.8393C5.67201 13.0534 5.32835 13.0538 5.13152 12.8393C5.10822 12.8139 5.02665 12.7475 4.90006 12.6444C3.88823 11.8202 0 8.65327 0 5.38067ZM2.73284 5.38067C2.73284 6.87341 3.97416 8.08784 5.5 8.08784C7.02581 8.08784 8.26713 6.87344 8.26713 5.3807C8.26713 3.88796 7.02581 2.67353 5.5 2.67353C3.97419 2.67353 2.73284 3.88793 2.73284 5.38067Z"
                                              fill="#BEA972"/>
                                    </svg>
                                    <LinkScroll to='home-map' className='font-small__upper' spy={true} smooth={true}
                                                duration={2500}>{t('look at the map')}</LinkScroll>
                                </div>
                            </div>
                            <div className='main-quarters__first'>
                                <ItemQuartersFirst
                                    title={section.main.description}
                                    revers={true}
                                    fullWith={true}
                                    img={section.main.image[0].path}
                                />
                            </div>
                            <div className='main-home__items'>
                                {
                                    complex.map((item, index) => {
                                        return (
                                            <ItemQuartersResidential
                                                link={item.url}
                                                key={item._id}
                                                item={item}
                                                index={index}
                                                singleFetchData={this.props.singleFetchData}
                                                history={this.props.history}
                                                id={item._id}
                                                deadline={item.deadline}
                                                status={item.status.label}
                                                title={item.title}
                                                img={item.photoPrewie[0].path}
                                                language={this.props.language}
                                                location={item.address}
                                                currentItemId={this.props.currentItemId}
                                            />
                                        )
                                    })}
                            </div>
                            <Element name='homemap'>
                                <div id='home-map' className='home-location-section'>
                                    {
                                        !section.location.coordinate.coordinate.lat ? <KadorrPreloader /> :
                                            <TabsQuartersMap
                                                t={t}
                                                idMarker={this.props.selectMap}
                                                item={complex}
                                                arrows={false}
                                                language={this.props.language}
                                                currentCategory={this.props.currentCategory}
                                                currentCityFromLocation={this.props.currentCityFromLocation}
                                                currentItemId={this.props.getCurrentItemId}
                                            />
                                    }
                                </div>
                            </Element>
                        </div>
                }
            </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.headerReducer.language,
        section: state.quartersGroupReducer.section,
        dataQuarters: state.homeReducer.dataQuarters,
        complex: state.quartersGroupReducer.complex,
        currentCategory: state.headerReducer.currentCategory,
        messageErrorQuarters: state.quartersGroupReducer.messageErrorQuarters,
        getCurrentItemId: state.homeReducer.currentItemId,
        currentCityFromLocation: state.headerReducer.currentCityFromLocation,
    };
};

const mapDispatchToProps = {
    quartersFetchData,
    changeLanguage,
    getCurrentCategory,
    currentItemId,
    singleFetchData

};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(WithBg(QuartersSingle))));
