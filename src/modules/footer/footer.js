import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import Logo from '../../components/logo';
import SocialIcon from '../../components/social-icon';
import Button from '../../components/button';
import PhoneNumber from '../../components/phone-number';

import './footer.scss';
import Modal from "../../components/modal";
import TitleDescModalForm from "../../components/title-desc-modal-form";
import FormMain from "../../components/form-main";
import { connect } from "react-redux";
import { fetchPhone, fetchSocialIcon } from './services/action';
import { getPhone } from './services/selectors'
import { getCurrentCategory, setCurrentCityFromLocation } from "../header/services/action";
import { fetchItemByFilter, homeResetFilter } from "../../pages/home/services/action";
import SocialWidget from "../../components/social-widget";
import CitySelectSaleDep from "../../components/city-select-sale-dep";

class Footer extends Component {
    state = {
        modal: false,
        modalSent: false,
        closeLng: false
    };

    closeModal = () => {
        document.querySelector('html').classList.remove('scroll-off');
        this.setState({ modal: false })
    };
    closeModalSent = () => {
        document.querySelector('html').classList.remove('scroll-off');
        this.setState({ modalSent: false })
    };

    openModal = () => {
        document.querySelector('html').classList.add('scroll-off');
        this.setState({ modal: true })
    };
    openModalSent = () => {
        document.querySelector('html').classList.add('scroll-off');
        this.setState({ modalSent: true })
    };

    componentDidMount() {
        this.props.fetchPhone('kiev');
        this.props.fetchSocialIcon();
    }

    langToLink = (lang) => {
        if(lang === 'ru') {
            return ''
        } else {
            return lang + '/'
        }
    };

    closeChooseCity = (e) => {
        if (e.target.className !== 'city-select-btn') {
            if (document.querySelector('.city-select.city-select__open') !== null) {
                document.querySelector('.city-select.city-select__open').classList.remove('city-select__open');
                document.querySelector('.city-select-btn').classList.add('rotate');
            }
        }
    };

    render() {
        const { t, tel } = this.props;
        const { icon } = this.props;
        let currentWindowLocation = window.location.pathname;
        let source = '';
        if (currentWindowLocation.includes('residential')) {
            source = 'ЖК footer';
        } else if (currentWindowLocation.includes('quarters')) {
            source = 'Кварталы footer';
        } else if (currentWindowLocation.includes('kids')) {
            source = 'Детям footer';
        } else {
            source = 'Главная footer';
        }

        const nav = [
            {
                url: 'living_complex',
                name: t('Residential complexes'),
                categories: 'living_complex',
            },
            {
                url: 'quarters',
                name: t('Pearl Apartments'),
                categories: 'quarters',
            },
            {
                url: 'commerce',
                name: t('Commerce'),
                categories: 'commerce',
            },
            {
                url: 'business_center',
                name: t('Business centers'),
                categories: 'business_center',
            },
            {
                url: 'shopping_center',
                name: t('Shopping centers'),
                categories: 'shopping_center',
            }, {
                url: 'link',
                name: t('Resale Property'),
                categories: 'Secondary',
            },
        ];

        return (
            <footer onClick={this.closeChooseCity} className='main-footer'>
                {
                    this.state.modal &&
                    <Modal modalClose={this.closeModal}>
                        <TitleDescModalForm title={t('We are always ready to answer any of your questions.')}
                            desc={t('Leave your details and write a question of interest. Our managers will contact you as soon as possible and will provide expert advice.')} />
                        <FormMain
                            t={t}
                            defaultValue={this.props.currentCityFromLocation}
                            closeModal={this.closeModal}
                            success={this.openModalSent}
                            source={source} />
                    </Modal>
                }
                {
                    this.state.modalSent &&
                    <Modal modalClose={this.closeModalSent}>
                        <div className='sent-successful'>
                            <div className='sent-successful__title title-section'>{t('Your application has been sent successfully')}
                            </div>
                            <div className='sent-successful__svg'>
                                <svg width="24" height="19" viewBox="0 0 24 19" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.99987 14.6001L2.39987 9.00013L0.533203 10.8668L7.99987 18.3335L23.9999 2.33346L22.1332 0.466797L7.99987 14.6001Z"
                                        fill="#BEA972" />
                                </svg>
                            </div>
                            <div className='sent-successful__desc font-medium'>{t('Please expect a call within 15 minutes. Thanks for trust')}
                            </div>
                        </div>
                    </Modal>
                }
                <div className='main-footer__top'>
                    <div className='footer-block'>
                        <Logo
                            resetHeader={this.props.homeResetFilter}
                            getCurrentCategory={this.props.getCurrentCategory}
                            goHome={this.props.fetchItemByFilter}
                        />
                        <SocialIcon icons={icon} />
                    </div>
                    <div className='footer-block'>
                        <div className='title-real-estate'>{t('Our Real Estate')}</div>
                        <ul className='real-estate-list'>
                            {nav.map((item, index) => {
                                if (item.url === 'link') {
                                    return (<li key={index} className='real-estate-list__item'><a className='font-small' href="https://kadorrgroup.com/" target='_blank'>{item.name}</a></li>)
                                } else if (item.url === 'living_complex') {
                                    return (<li key={index} className='real-estate-list__item'><a href="/">{item.name}</a></li>)
                                } else {
                                    return (<li key={index} className='real-estate-list__item'><a href={`/${this.props.language}/${item.url}`}>{item.name}</a></li>)
                                }
                            })}
                        </ul>
                    </div>
                    <div className='footer-block'>
                        <div className='title-real-estate'>{t('About Us')}</div>
                        <ul className='real-estate-list'>
                            <li className='real-estate-list__item'><a href={`https://kadorrgroup.com/${this.langToLink(this.props.language)}`} target='_blank'>{t('Our Advantages')}</a></li>
                            <li className='real-estate-list__item'><a href={`https://kadorrgroup.com/${this.langToLink(this.props.language)}company-today`} target='_blank'>{t('Company Today')}</a></li>
                            <li className='real-estate-list__item'><a href={`https://kadorrgroup.com/${this.langToLink(this.props.language)}social-projects`} target='_blank'>{t('Social Project')}</a></li>
                            <li className='real-estate-list__item'><a href={`https://kadorrgroup.com/${this.langToLink(this.props.language)}press-centre/`} target='_blank'>{t('Press Center')}</a></li>
                            <li className='real-estate-list__item'><a href={`https://kadorrgroup.com/${this.langToLink(this.props.language)}contacts/`} target='_blank'>{t('Contacts')}</a></li>
                        </ul>
                    </div>
                    <div className='footer-block'>
                        <div className='title-real-estate'>
                            <div className='title-real-estate-city'>{t('Sales Department')}</div>
                            <CitySelectSaleDep
                                currentCityFromLocation={this.props.currentCityFromLocation}
                                changePhone={this.props.fetchPhone}
                            />
                        </div>
                        {
                            tel &&
                            tel.slice(0, 2).map(element => {
                                return (
                                    <PhoneNumber key={element._id} number={element.phone} />
                                )
                            })
                        }
                        <Button onClick={this.openModal} label={t('Contact')} bgColor={true} fullWith={true} />
                    </div>
                </div>
                <div className='main-footer__bottom'>
                    <div className='copyright'>© {new Date().getFullYear()}</div>
                    <div className='by-rossery'>
                       <a href="https://rossery.com/" target="_blank">
                       <span>made by</span>
                        <svg width="57" height="9" viewBox="0 0 57 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M57 0H55.2621L53.0066 3.98571L50.7379 0H49L52.2371 5.4257V9H53.7629V5.4257L57 0Z"
                                fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M49 9H47.32L45.3467 5.72142H43.5333V9H42V4.39713H45.7333C46.5467 4.39713 47.2 3.72857 47.2 2.89285C47.2 2.04428 46.5467 1.38857 45.7333 1.38857H42V0H45.7333C47.4 0 48.7333 1.28571 48.7333 2.89285C48.7333 4.04999 47.9734 5.07856 46.88 5.50285L49 9Z"
                                fill="white" />
                            <path
                                d="M35.6235 5.1557V7.58568H40V9H34V0H39.9294V1.41428H35.6235V3.75428H39.5764V5.1557H35.6235Z"
                                fill="white" />
                            <path
                                d="M29.6486 9C31.6216 9 33 8.03306 33 6.4463C33 4.72316 31.4189 4.27687 29.8513 3.8182C28.473 3.4215 27.9459 3.13637 27.9459 2.46695C27.9459 1.80993 28.527 1.38843 29.4324 1.38843C30.4865 1.38843 31.0811 1.90909 31.4189 2.60331L32.7297 1.90909C32.1351 0.756202 30.9865 0 29.4324 0C27.8378 0 26.3919 0.904965 26.3919 2.50414C26.3919 4.14051 27.8243 4.63638 29.2973 5.04547C30.7027 5.44217 31.4459 5.70249 31.4459 6.47111C31.4459 7.10335 30.9189 7.61157 29.6892 7.61157C28.4054 7.61157 27.6757 7.02897 27.3378 6.14878L26 6.86779C26.5 8.15708 27.7838 9 29.6486 9Z"
                                fill="white" />
                            <path
                                d="M21.6486 9C23.6216 9 25 8.03306 25 6.4463C25 4.72316 23.4189 4.27687 21.8514 3.8182C20.473 3.4215 19.9459 3.13637 19.9459 2.46695C19.9459 1.80993 20.527 1.38843 21.4325 1.38843C22.4865 1.38843 23.0811 1.90909 23.4189 2.60331L24.7297 1.90909C24.1351 0.756202 22.9865 0 21.4325 0C19.8378 0 18.3919 0.904965 18.3919 2.50414C18.3919 4.14051 19.8243 4.63638 21.2973 5.04547C22.7027 5.44217 23.4459 5.70249 23.4459 6.47111C23.4459 7.10335 22.9189 7.61157 21.6892 7.61157C20.4054 7.61157 19.6757 7.02897 19.3378 6.14878L18 6.86779C18.5 8.15708 19.7838 9 21.6486 9Z"
                                fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M17 4.50002C17 7.01656 15.0166 9 12.5 9C9.99586 9 8 7.01656 8 4.50002C8 1.98348 9.99586 0 12.5 0C15.0166 0 17 1.98348 17 4.50002ZM9.42564 4.50002C9.42564 6.28514 10.7645 7.61157 12.5 7.61157C14.2355 7.61157 15.5744 6.28514 15.5744 4.50002C15.5744 2.71489 14.2355 1.38843 12.5 1.38843C10.7645 1.38843 9.42564 2.71489 9.42564 4.50002Z"
                                fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M7 9H5.32001L3.34668 5.72142H1.53334V9H0V4.39713H3.73334C4.54667 4.39713 5.20001 3.72857 5.20001 2.89285C5.20001 2.04428 4.54667 1.38857 3.73334 1.38857H0V0H3.73334C5.40001 0 6.73335 1.28571 6.73335 2.89285C6.73335 4.04999 5.97335 5.07856 4.88001 5.50285L7 9Z"
                                fill="white" />
                        </svg>
                       </a>
                    </div>
                </div>
                <SocialWidget />
            </footer>
        );
    }
}

const mapStateToProps = state => {
    return {
        tel: getPhone(state),
        icon: state.footerReducer.icon,
        currentCityFromLocation: state.headerReducer.currentCityFromLocation,
        language: state.headerReducer.language
    };
};

const mapDispatchToProps = {
    fetchPhone,
    fetchSocialIcon,
    setCurrentCityFromLocation,
    homeResetFilter,
    getCurrentCategory,
    fetchItemByFilter
};

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Footer));
