import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Breadcrumbs, BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
import Helmet from 'react-helmet/es/Helmet';
import ReactPlayer from 'react-player';
import {withTranslation} from 'react-i18next';
import SliderOnSingle from '../../components/slider-on-single';
import ImgText from '../../components/img-text';
import FormMain from '../../components/form-main';
import TitleDescModalForm from '../../components/title-desc-modal-form';
import Modal from '../../components/modal';
import WithBg from '../../components/with-bg/with-bg';
import {translate_language} from '../../helpers/helpers'
import {
    // closeCamera,
    // openCamera,
    // openForm,
    // closeForm,
    // singleFetchData,
    // clearData
} from './services/action';

import {
    getCameraState, getErrorData,
    getFormState,
    getKidsData
} from './services/selectors';

import Button from '../../components/button';
import Welcome from '../../components/welcome';
import GMapRoutes from '../../components/g-map-routes';

import Banner from '../../components/banner';

import ImgFullWith from '../../components/img-full-with';
import classNames from 'classnames';
import {changeLanguage, getNameItemMenu} from '../../modules/header/services/action';
import TabsWithArrowsInfrastructure from '../../components/tabs-with-arrows-infrastructure';
import KadorrPreloader from '../../components/kadorr-preloader';
import InstaFeed from "../../components/insta-feed";
import {kidsFetchData} from "./services/action";
import WelcomeKids from "../../components/welcome-kids";
import MetaTags from "../../components/meta-tags";
import WrapForSliderPopUpModal from "../../components/wrap-for-slider-pop-up-modal/wrap-for-slider-pop-up-modal";

class Kids extends Component {
    state = {
        tabIndex: 0,
        modal: false,
        modalSent: false,
        modalCharacteristics: false,
        modalGallery: false,
        modalStream: false,
        streamLink: null
    };

    componentDidMount() {
        setTimeout(() => {
            const page = document.querySelector('.main-single-residential');
            document.querySelector('#main-header').classList.remove('main-header__scroll');
            if (page) {
                page.classList.add('animation-ready')
            }
        }, 250);

        const {id} = this.props.match.params;

        const language = this.props.match.path.split('/')[1];

        this.props.kidsFetchData({id, language: translate_language(language)});

        this.props.changeLanguage(language);
        this.props.i18n.init({
            lng: language,
        });

        this.props.i18n.on('languageChanged', language => {
            const url = this.props.data.url[translate_language(language)];
            this.props.kidsFetchData({id: url, language: translate_language(language)});
            this.props.history.push(`/${language}/pages/${url}`);
        });

        document.querySelector('body').classList.add('done');
    }

    componentWillUnmount() {
        this.props.i18n.off('languageChanged');
    }

    closeModal = () => this.setState({modal: false});
    closeModalSent = () => {
        document.querySelector('html').classList.remove('scroll-off');
        this.setState({modalSent: false});
    };

    openModal = () => {
        this.setState({modal: true});
    };
    openModalSent = () => {
        document.querySelector('html').classList.add('scroll-off');
        this.setState({modalSent: true});
    };

    openCamera = () => {
        document.querySelector('html').classList.add('scroll-off');
        this.props.openCamera();
    };

    closeChooseLanguage = () => {
        document.querySelector('.choose-language').classList.remove('choose-language__open');
    };

    openModalGallery = () => {
        document.querySelector('html').classList.add('scroll-off');
        this.setState({modalGallery: true});
    };

    closeModalGallery = () => {
        document.querySelector('html').classList.remove('scroll-off');
        this.setState({modalGallery: false})
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.messageErrorKids) {
            this.props.history.push('/404');
        }
    }

    lngForLivingComplex = (language) => {
        if (language === 'ru') {
            return ''
        } else {
            return language
        }
    };


    render() {
        const {data, cameraModal, t} = this.props;
        return (
            <div>
                {
                    !data ? <KadorrPreloader/>
                        : <div onClick={this.closeChooseLanguage} className="main-single-residential">
                            <MetaTags seo={{
                                title: data.content.title,
                                description: data.content.title,
                                seoTitle: data.content.seo.title.trim(),
                                seoDescription: data.content.seo.meta.trim()
                            }} />
                            {
                                this.state.modalSent &&
                                <Modal modalClose={this.closeModalSent}>
                                    <div className="sent-successful">
                                        <div className="sent-successful__title title-section">{t('Your application has been sent successfully')}
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
                            <BreadcrumbsItem to={`/${this.lngForLivingComplex(this.props.language)}`}>{t('main')}</BreadcrumbsItem>
                            <BreadcrumbsItem to="/district">{data.content.main.title}</BreadcrumbsItem>
                            <div className="welcome-single-residential">
                                <WelcomeKids
                                    content={data.content.main}
                                    t={t}
                                />
                            </div>
                            {
                                cameraModal &&
                                <Modal bg="transparent" modalClose={this.closeCamera}>
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
                                        <ReactPlayer url={this.state.streamLink} playing={true}/>
                                    </Modal>
                                    }
                                </Modal>
                            }

                            {data.content.constructor.length > 0 ?

                                data.content.constructor.map((item, index) => {
                                    switch (item.component) {
                                        case 'slider-popup' : {
                                            const section = item.data.length > 1 ? <div key={item._id}
                                                                                        className={classNames('single-slider-section', {'single-slider-section__revers': item.text_right})}>
                                                    <WrapForSliderPopUpModal sliderId={index} data={item}/>
                                                </div> :
                                                <div key={item._id} className="single-img-text-section">
                                                    <ImgText item={item}/>
                                                </div>;
                                            return section;
                                        }
                                        case 'form' : {
                                            return (
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
                                            );
                                        }
                                        case 'image-full-width' : {
                                            return (
                                                <div key={item._id} className="single-img-full-with-section">
                                                    <ImgFullWith item={item}/>
                                                </div>
                                            );
                                        }
                                        case 'instagram' : {
                                            return (
                                                <div className="single-instagramm-section">
                                                    <InstaFeed icons={this.props.icon}/>
                                                </div>
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
        formModal: getFormState(state),
        messageError: getErrorData(state),
        data: state.kidsReducer.kidsData,
        language: state.headerReducer.language,
        currentCityFromLocation: state.headerReducer.currentCityFromLocation,
        icon: state.footerReducer.icon,
        messageErrorKids: state.kidsReducer.messageErrorKids
    };
};

const mapDispatchToProps = {
    getNameItemMenu,
    changeLanguage,
    kidsFetchData
};

export default connect(mapStateToProps, mapDispatchToProps)(WithBg(withTranslation()(Kids)));
