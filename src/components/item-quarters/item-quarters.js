import React, { Component } from 'react';
import classNames from 'classnames';
import { Link as LinkScroll } from 'react-scroll'
import { Transition } from 'react-transition-group';
import { STATIC_FILE, replace_path } from '../../helpers/constants';
import { translate_language } from '../../helpers/helpers';

import './item-quarters.scss';

class ItemQuarters extends Component {

    state = {
        animation: false
    }

    div = React.createRef();

    defaultStyle = {
        position: 'fixed',
        left: '0',
        bottom: '0',
        zIndex: -1,
        height: '100%',
        opacity: 0,
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }

    transitionStyles = {
        entering: {
            maxHeight: '100vh'
        },
        entered: {
            opacity: 1,
            maxHeight: '100vh',
            bottom: 0,
            zIndex: 998
        },
        exiting: { opacity: 0 },
        exited: { opacity: 0 }
    };

    currentItemId = () => {
        this.props.currentItemId(this.props.id)
    };

    Fade = ({ in: inProp }) => (
        <Transition
            onEntered={() => {
                const index = this.props.index + 1;

                if (index === 1 || (index - 1) % 3 === 0) { // анимация для карточки слева
                    this.div.current.classList.add('quarters-router-animation-left');

                } else if (index === 2 || (index - 2) % 3 === 0) { // анимация для карточки центр
                    this.div.current.classList.add('quarters-router-animation-center');

                } else if (index % 3 === 0) { // анимация для карточки справа
                    this.div.current.classList.add('quarters-router-animation-right');

                }

            }}
            in={inProp}
        >
            {state => (
                <div ref={this.div} style={{
                    ...this.defaultStyle,
                    ...this.transitionStyles[state]
                }}
                />
            )}
        </Transition>
    );

    animation = ({ target }) => {
        document.querySelector('#main-header').classList.add('header-hide');
        const { quartersFetchData, id, language, link } = this.props;
        quartersFetchData({ id: link, language: translate_language(language) });
        document.querySelector('.main-home__items').classList.add('transform-list-animation-single');
        target.closest('.item-residential__container').querySelector('.item-residential').style.opacity = '0';
        this.setState({ animation: true });

        this.div.current.addEventListener('animationend', () => {
            this.props.history.push(`/${language}/quarters/${link}`);
            document.querySelector('#main-header').classList.remove('header-hide');
        });


    }

    render() {
        const { link, img, title, location, revers = false, fullWith = false, language } = this.props;
        const { t } = this.props;
        return (
            <>
                <this.Fade in={this.state.animation} />
                    <div className={classNames('wrap-item-residential', {
                        'item-residential__revers': window.innerWidth < 413 ? false : revers,
                        'item-residential__flex-dir': window.innerWidth < 413 ? false : fullWith
                    })}>
                            <div className="item-residential__container">
                        <div
                            className={classNames('item-residential')}
                        >
                            <span
                                onClick={this.animation}
                                className={classNames('item-residential__wrap-img', { 'item-residential__full-width': window.innerWidth < 413 ? false : fullWith })}>
                                {img &&
                                    <div className="item-img-cont">
                                        <img src={replace_path(`${STATIC_FILE}${img}`)} alt="residential" className='item-residential__img' />
                                    </div>}
                            </span>
                            <LinkScroll onClick={this.currentItemId} to='home-map' className='item-residential__wrap-point-map' spy={true} smooth={true}
                                duration={2500}>
                                <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M0 5.38067C0 2.41377 2.46728 0 5.5 0C8.53269 0 10.9999 2.41377 11 5.38067C11 8.65327 7.11177 11.8202 6.09994 12.6444C5.97335 12.7475 5.89178 12.8139 5.86848 12.8393C5.67201 13.0534 5.32835 13.0538 5.13152 12.8393C5.10822 12.8139 5.02665 12.7475 4.90006 12.6444C3.88823 11.8202 0 8.65327 0 5.38067ZM2.73284 5.38067C2.73284 6.87341 3.97416 8.08784 5.5 8.08784C7.02581 8.08784 8.26713 6.87344 8.26713 5.3807C8.26713 3.88796 7.02581 2.67353 5.5 2.67353C3.97419 2.67353 2.73284 3.88793 2.73284 5.38067Z"
                                        fill="white" />
                                </svg>
                            </LinkScroll>
                        </div>
                        <div onClick={this.animation} className='item-residential__wrap-info'>
                            <span to={`/${language}/quarters/${link}`} className='font-large'>{title}</span>
                            <div className='font-medium'>{location}</div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ItemQuarters;
