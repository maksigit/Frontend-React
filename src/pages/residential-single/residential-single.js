import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import ReactPlayer from 'react-player';
import { withTranslation } from 'react-i18next';
import WelcomeContentSingle from '../../components/welcome-content-single';
import Characteristics from '../../components/characteristics';
import ImgText from '../../components/img-text';
import Tabs from '../../components/tabs';
import TabsWithArrows from '../../components/tabs-with-arrows';
import TitleSection from '../../components/title-section';
import FormMain from '../../components/form-main';
import TitleDescModalForm from '../../components/title-desc-modal-form';
import Modal from '../../components/modal';
import WebCam from '../../components/web-cam';
import WithBg from '../../components/with-bg/with-bg';
import { translate_language, categories_path, language_path } from '../../helpers/helpers'
import {
    closeCamera,
    openCamera,
    openForm,
    closeForm,
    singleFetchData,
    clearData
} from './services/action';

import {
    getCameraState, getErrorData,
    getFormState,
    getSingleData
} from './services/selectors';

import Button from '../../components/button';
import GMapRoutes from '../../components/g-map-routes';

import Banner from '../../components/banner';

import './residential-single.scss';
import ImgFullWith from '../../components/img-full-with';
import classNames from 'classnames';
import {
    changeLanguage,
    getCurrentCategory,
    getNameItemMenu,
    setCurrentCityFromLocation
} from '../../modules/header/services/action';
import TabsWithArrowsInfrastructure from '../../components/tabs-with-arrows-infrastructure';
import KadorrPreloader from '../../components/kadorr-preloader';
import InstaFeed from "../../components/insta-feed";
import TabsWithArrowsTemplate from "../../components/tabs-with-arrows-template";
import { Element } from "react-scroll";
import MetaTags from "../../components/meta-tags";
import WrapForSliderPopUpModal from "../../components/wrap-for-slider-pop-up-modal/wrap-for-slider-pop-up-modal";
import TabsProgress from "../../components/tabs-progress";

class ResidentialSingle extends Component {
    state = {
        tabIndex: 0,
        modal: false,
        modalSent: false,
        modalCharacteristics: false,
        modalGallery: false,
        modalStream: false,
        streamLink: null,
        cityGetUs: false
    };

    singleRef = React.createRef(null);

    componentDidMount() {
        setTimeout(() => {
            const page = document.querySelector('.main-single-residential');
            document.querySelector('#main-header').classList.remove('main-header__scroll');
            if (page) {
                page.classList.add('animation-ready')
            }
        }, 250);

        const { id, language, currentcategory } = this.props.match.params;
        document.querySelector('body').classList.add('complex-single-ready');
        if (language_path[language] && categories_path[currentcategory] === undefined) {
            return;
        }
        if (currentcategory) {
            this.props.getCurrentCategory(currentcategory)
        }
        if (this.props.data === null) {
            this.props.singleFetchData({ id, language: translate_language(language) });
        }
        this.props.changeLanguage(language);
        this.props.i18n.init({
            lng: language,
        });

        this.props.i18n.on('languageChanged', language => {
            const url = this.props.data.url[translate_language(language)];
            this.props.singleFetchData({ id: url, language: translate_language(language) });
            this.props.history.push(`/${language}/${this.props.currentCategory}/${url}`);
        });
        document.querySelector('body').classList.add('done');
        document.querySelector('.preloadWhite').classList.add('loaded');
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { data, cameraModal } = this.props;
        return JSON.stringify(data) !== JSON.stringify(nextProps.data)
            || JSON.stringify(nextState) !== JSON.stringify(this.state)
            || JSON.stringify(cameraModal) !== JSON.stringify(nextProps.cameraModal)
            || JSON.stringify(this.props.formModal) !== JSON.stringify(nextProps.formModal)
            || JSON.stringify(this.props.icon) !== JSON.stringify(nextProps.icon)
            || nextProps.messageError !== this.props.messageError
            || nextProps.currentCityFromLocation !== this.props.currentCityFromLocation

    }

    componentWillUnmount() {
        this.props.clearData();
        this.props.i18n.off('languageChanged');
    }


    componentDidUpdate() {
        if (this.props.messageError) {
            this.props.history.push('/404');
        }
    }

    closeModal = () => this.setState({ modal: false });
    closeModalSent = () => {
        document.querySelector('html').classList.remove('scroll-off');
        this.setState({ modalSent: false });
    };
    closeModalCharacteristics = () => {
        document.querySelector('html').classList.remove('scroll-off');
        this.setState({ modalCharacteristics: false });
    };

    closeModalGallery = () => {
        document.querySelector('html').classList.remove('scroll-off');
        this.setState({ modalGallery: false })
    };

    closeCamera = () => {
        document.querySelector('html').classList.remove('scroll-off');
        document.querySelector(".main-header").classList.remove('fadeOutUp');
        document.querySelector(".breadcrumbs").classList.remove('fadeOutUp');
        document.querySelector(".slider__item-deadline-cam").classList.remove('fadeOutRight');
        document.querySelector(".slider__item-deadline-wrap").classList.remove('fadeOutRight');
        document.querySelector(".slider__item-content").classList.remove('fadeOutLeft');
        return this.props.closeCamera();
    };

    closeModalStream = () => {
        this.setState({
            modalStream: false
        });
    };

    openModal = () => {
        this.setState({ modal: true });
    };
    openModalSent = () => {
        document.querySelector('html').classList.add('scroll-off');
        this.setState({ modalSent: true });
    };
    openModalCharacteristics = () => {
        document.querySelector('html').classList.add('scroll-off');
        this.setState({ modalCharacteristics: true });
    };
    openModalGallery = () => {
        document.querySelector('html').classList.add('scroll-off');
        this.setState({ modalGallery: true });
    };

    openCamera = () => {
        document.querySelector('html').classList.add('scroll-off');
        document.querySelector(".main-header").classList.add('fadeOutUp');
        document.querySelector(".breadcrumbs").classList.add('fadeOutUp');
        document.querySelector(".slider__item-deadline-cam").classList.add('fadeOutRight');
        document.querySelector(".slider__item-deadline-wrap").classList.add('fadeOutRight');
        document.querySelector(".slider__item-content").classList.add('fadeOutLeft');
        this.props.openCamera();
    };

    openModalStream = () => {
        this.setState({
            modalStream: true
        });
    };

    getLinkStream = link => {
        this.setState({ streamLink: link });
        this.openModalStream();
    };

    closeChooseLanguage = () => {
        document.querySelector('.choose-language').classList.remove('choose-language__open');
    };

    toggleCityGetUs = () => {
        if (this.props.currentCityFromLocation === 'odessa') {
            this.setState({
                cityGetUs: false
            })
        } else {
            this.setState({
                cityGetUs: true
            })
        }
    };

    redirectToHome = (e) => {
        e.preventDefault();
        this.props.history.push("/")
    };

    changeCategory = () => {
        this.props.getCurrentCategory('living_complex')
    };

    render() {
        const { data, cameraModal, t } = this.props;
        return (
            <div>
                <div className="preloadWhite">
                </div>
                {
                    !data ? <KadorrPreloader />
                        : <div ref={this.singleRef} onClick={this.closeChooseLanguage} className="main-single-residential">
                            <MetaTags seo={{
                                title: data.content.title,
                                description: data.content.title,
                                seoTitle: data.content.seo.title.trim(),
                                seoDescription: data.content.seo.description.trim()
                            }}
                            />
                            {
                                this.state.modalSent &&
                                <Modal modalClose={this.closeModalSent}>
                                    <div className="sent-successful">
                                        <div
                                            className="sent-successful__title title-section">{t('Your application has been sent successfully')}</div>
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
                                        <div
                                            className="sent-successful__desc font-medium">{t('Please expect a call within 15 minutes. Thanks for trust')}</div>
                                    </div>
                                </Modal>
                            }
                            <BreadcrumbsItem onClick={this.changeCategory} to="/">{t('main')}</BreadcrumbsItem>
                            {this.props.match.params.currentcategory === 'living_complex' ?
                                <BreadcrumbsItem onClick={this.redirectToHome}
                                    to={`/${this.props.language}`}>{t(this.props.match.params.currentcategory)}</BreadcrumbsItem>
                                :
                                <BreadcrumbsItem
                                    to={`/${this.props.language}/${this.props.match.params.currentcategory}`}>{t(this.props.match.params.currentcategory)}</BreadcrumbsItem>
                            }
                            <BreadcrumbsItem
                                to={`/${this.props.language}/${this.props.currentCategory}/district`}>{data.content.title}</BreadcrumbsItem>
                            <div className="welcome-single-residential">
                                <WelcomeContentSingle
                                    content={data.content}
                                    openCamera={this.openCamera}
                                    openModal={this.props.openForm}
                                    phone={data.phone}
                                    otherLink={data.other}
                                    t={t}
                                    dataDeadline={data.status}
                                />
                            </div>
                            {
                                cameraModal &&
                                <Modal bg="transparent" streamOverlay="streamOverlay" modalClose={this.closeCamera}>
                                    {
                                        data.content.camera.length > 0 ?
                                            data.content.camera.map((item, index) => {
                                                return (
                                                    <Button
                                                        label={item.title}
                                                        skew={true}
                                                        svg={true}
                                                        onClick={() => this.getLinkStream(item.url)}
                                                    />
                                                );
                                            }) : null
                                    }

                                    {this.state.modalStream &&
                                        <Modal bg="transparent" stream="stream" modalClose={this.closeModalStream}>
                                            <ReactPlayer url={this.state.streamLink} playing={true} />
                                        </Modal>
                                    }
                                </Modal>
                            }

                            {data.content.constructor.length > 0 ?

                                data.content.constructor.map((item, index) => {
                                    switch (item.component) {
                                        case 'slider-popup': {
                                            const section = item.data.length > 1 ? <div key={item._id}
                                                className={classNames('single-slider-section', { 'single-slider-section__revers': item.text_right })}>
                                                <WrapForSliderPopUpModal sliderId={index} data={item} />
                                            </div> :
                                                <div key={item._id} className="single-img-text-section">
                                                    <ImgText item={item} />
                                                </div>;

                                            return section;

                                        }

                                        case 'form': {
                                            return (
                                                <Element name={`screen${index + 1}`}>
                                                    <div key={item._id} className="single-form-section">
                                                        <TitleDescModalForm title={item.title}
                                                            desc={item.description}
                                                        />
                                                        <FormMain t={t} closeModal={this.closeModal}
                                                            success={this.openModalSent}
                                                            source={this.props.data.content.title}
                                                            defaultValue={this.props.currentCityFromLocation}
                                                        />
                                                    </div>
                                                </Element>
                                            );
                                        }
                                        case 'image-full-width': {
                                            return (
                                                <Element name={`screen${index + 1}`}>
                                                    <div key={item._id} className="single-img-full-with-section">
                                                        <ImgFullWith item={item} />
                                                    </div>
                                                </Element>
                                            );
                                        }
                                        case 'banner': {
                                            return (
                                                <Element name={`screen${index + 1}`}>
                                                    <div key={item._id} className="single-banner-section">
                                                        <Banner openModal={this.props.openForm} buttonText={item.button}
                                                            img={item.data[0].path}
                                                            action={item.action}
                                                            mobilePhoto={item.mobilePhoto[0].path}
                                                            desc={item.description}
                                                            url={item.url}
                                                        />
                                                    </div>
                                                </Element>
                                            );
                                        }
                                        case 'layout': {
                                            return (
                                                <Element name={`screen${index + 1}`}>
                                                    <div key={item._id} className="single-planing-section">
                                                        <TitleSection titleSection={item.title} />
                                                        <Tabs item={item.data} arrows={false} />
                                                    </div>
                                                </Element>
                                            );
                                        }
                                        case 'get_to_us': {
                                            return (
                                                <Element name={`screen${index + 1}`}>
                                                    <div key={item._id} className="single-map-routes-section">
                                                        <GMapRoutes
                                                            t={t}
                                                            infoParking={item.parking}
            
                                                            city={this.props.currentCityFromLocation}
                                                            placeId={item.place_id}
                                                            toggleCity={this.toggleCityGetUs}
                                                            trueOrFalseCity={this.state.cityGetUs}
                                                            setCurrentCity={this.props.setCurrentCityFromLocation}
                                                        />
                                                    </div>
                                                </Element>
                                            );
                                        }
                                        case 'advantage': {
                                            return (
                                                <Element name={`screen${index + 1}`}>
                                                    <div key={item._id} className="single-advantages-section">
                                                        <TitleSection titleSection={item.section_title} />
                                                        <TabsWithArrows
                                                            tabId={index}
                                                            item={item.data}
                                                            arrows={true}
                                                            t={t}
                                                        />
                                                    </div>
                                                </Element>
                                            );
                                        }
                                        case 'construction-progress': {
                                            return (
                                                <Element name={`screen${index + 1}`}>
                                                    <div key={item._id} className="single-progress-section">
                                                        <div className="single-progress-title-wrapper">
                                                            <TitleSection titleSection={item.section_title} />
                                                            <WebCam length={data.content.camera.length}
                                                                openCamera={this.openCamera} />
                                                        </div>
                                                        <TabsProgress arrows={true} item={item.data} />
                                                    </div>
                                                </Element>
                                            );
                                        }
                                        case 'characteristics': {
                                            return (
                                                <Element name={`screen${index + 1}`}>
                                                    <div className="single-characteristics-section">
                                                        <Characteristics
                                                            t={t}
                                                            more={item.more.length} title={item.section_title}
                                                            data={item.data}
                                                            openCharacter={this.openModalCharacteristics}
                                                        />
                                                        {
                                                            this.state.modalCharacteristics &&
                                                            <Modal bg="char" modalClose={this.closeModalCharacteristics}>
                                                                {item.more.map((item, index) => {
                                                                    return (
                                                                        <div className="wrap-char">
                                                                            <div className="wrap-char__title font-small">
                                                                                {item.title}
                                                                            </div>
                                                                            {item.data.map(it => {
                                                                                return (
                                                                                    <div className="wrap-char__item">
                                                                                        <div>{it.description}</div>
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    );
                                                                })}
                                                            </Modal>
                                                        }
                                                    </div>
                                                </Element>
                                            );
                                        }
                                        case 'infrastructure': {
                                            return (
                                                <Element name={`screen${index + 1}`}>
                                                    <div className="single-location-infrastructure-section">
                                                        <TitleSection titleSection={item.section_title} />
                                                        <TabsWithArrowsInfrastructure
                                                            mainPoint={data.coordinate.x}
                                                            item={item.data}
                                                            arrows={false}
                                                            t={t}
                                                        />
                                                    </div>
                                                </Element>
                                            );
                                        }
                                        case 'instagramm': {
                                            return (
                                                <Element name={`screen${index + 1}`}>
                                                    <div className="single-instagramm-section">
                                                        <InstaFeed icons={this.props.icon} />
                                                    </div>
                                                </Element>
                                            );
                                        }
                                        case 'template': {
                                            return (
                                                <Element name={`screen${index + 1}`}>
                                                    <div key={item._id} className="single-advantages-section">
                                                        <TitleSection titleSection={item.section_title} />
                                                        <TabsWithArrowsTemplate
                                                            tabId={index}
                                                            item={item.data.constructor}
                                                            arrows={true}
                                                            t={t}
                                                        />
                                                    </div>
                                                </Element>
                                            );
                                        }
                                    }
                                })
                                : null
                            }
                            {
                                this.props.formModal &&
                                <Modal modalClose={this.props.closeForm}>
                                    <TitleDescModalForm title={t('We are always ready to answer any of your questions.')}
                                        desc={t('Leave your details and write a question of interest. Our managers will contact you as soon as possible and will provide expert advice.')}
                                    />
                                    <FormMain closeModal={this.closeModal} success={this.openModalSent}
                                        source={this.props.data.content.title}
                                        defaultValue={this.props.currentCityFromLocation}
                                        t={t}
                                    />
                                </Modal>
                            }
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cameraModal: getCameraState(state),
        formModal: getFormState(state),
        messageError: getErrorData(state),
        data: getSingleData(state),
        language: state.headerReducer.language,
        currentCityFromLocation: state.headerReducer.currentCityFromLocation,
        icon: state.footerReducer.icon,
        // currentCity: state.headerReducer.currentCityFromLocation,
        currentCategory: state.headerReducer.currentCategory
    };
};

const mapDispatchToProps = {
    openCamera,
    closeCamera,
    openForm,
    closeForm,
    singleFetchData,
    clearData,
    getNameItemMenu,
    changeLanguage,
    getCurrentCategory,
    setCurrentCityFromLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(WithBg(withTranslation()(ResidentialSingle)));
