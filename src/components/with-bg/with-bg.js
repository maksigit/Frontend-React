import React, {Component} from 'react';
import debounce from "../../helpers/debounce";

const WithBg = (WrappedComponent) => {
    return class extends Component {

        componentDidMount() {
            window.scrollTo(0, 0);
            var mainHeader = document.querySelector('#main-header');
            var chooseLanguage = document.querySelector('.choose-language');

            setTimeout(() => {

                const myEfficientFn2 = debounce(function () {
                    mainHeader.classList.add('main-header__scroll');
                    document.querySelector('.choose-language').classList.add('main-header__scroll');
                    window.removeEventListener('scroll', myEfficientFn2);
                }, 50);

                if (!mainHeader.classList.contains('not-scroll')) {
                  
                } else {
                    window.addEventListener('scroll', myEfficientFn2);
                }
            }, 0);

            var sliderImages = document.querySelectorAll('body .anim');
            function scrollAnimation() {
                sliderImages.forEach(function(sliderImage) {
                    // высота прокрутки отсчет идет с нижней точки экрана
                    var slideInAt = (window.scrollY + window.innerHeight) - sliderImage.clientHeight - 50;
                    var imageBottom = Math.ceil((window.pageYOffset - sliderImage.getBoundingClientRect().top) + sliderImage.scrollHeight) + 100;
                    var isHalfShown = slideInAt > Math.ceil((window.pageYOffset - sliderImage.getBoundingClientRect().top));
                    var isNotScrolledPast = window.scrollY < imageBottom;
                    if (isHalfShown && isNotScrolledPast && document.body.classList.contains('done')) {
                        setTimeout(function () {
                            sliderImage.classList.add('done');
                        }, 100);
                    }
                });
            }
            function scrollAnimationRemove() {
                var sliderImages = document.querySelectorAll('body .anim');
                sliderImages.forEach(function(sliderImage) {
                            sliderImage.classList.remove('anim');
                });
            }

            const scrollDocument = debounce( () => {
                if (window.pageYOffset === 0 && !this.props.match.url.includes('/quarters/')) {
                    mainHeader.classList.remove('main-header__scroll');
                    chooseLanguage.classList.remove('main-header__scroll');
                } else {
                    mainHeader.classList.add('main-header__scroll');
                    chooseLanguage.classList.add('main-header__scroll');
                    if (window.innerWidth > 768) {
                        scrollAnimation();
                    } else {
                        scrollAnimationRemove()
                    }
                }
            });


            window.addEventListener('scroll', scrollDocument);
        }

        componentWillUnmount() {
            document.querySelector('#main-header').classList.add('not-scroll');
            document.querySelector('#main-header').classList.remove('main-header__scroll');
            document.querySelector('.choose-language').classList.remove('main-header__scroll');
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
};

export default WithBg;