        import React from 'react'
        import { NavLink } from "react-router-dom";
        import { Link } from 'react-scroll';

        const ItemMenu = ({ item, changeCategory, getName, language, getCurrentCategory, getQuarters, closeMobileMenu, setCurrentIndexCategories, fetchCoordinates, clearPageHousing, clearPageQuarters, dataQuarters }) => {
            const { exact, url, categories, name, index } = item;

            const handleClick = (e) => {
                // console.log('handleClick')
                const target = e.target.attributes.target;
                const animation_div = document.querySelector('#slider-router-animation');
                animation_div.classList.add('transition');

            setTimeout(() => {
                if (target) {
                    return
                }
                if (categories === 'quarters' && dataQuarters.length === 0) {
                    clearPageQuarters();
                    getQuarters({})
                } else {


                }
                getName(name);
                getCurrentCategory(url);
                closeMobileMenu();
                setCurrentIndexCategories(index + 1);
                fetchCoordinates(categories)

                clearPageHousing();
                changeCategory({});
            }, 600);
                animation_div.addEventListener('transitionend', () => {
                    // animation_div.classList.remove('transition');
                    // getCurrentCategory(url);
                    setTimeout(() => {
                        animation_div.classList.remove('transition');

                    }, 100);

                });


            };

            const lngForLivingComplex = (language) => {
                if (language === 'ru') {
                    return ''
                } else {
                    return language
                }
            };

            return (
                <Link to="home-welcome" onClick={handleClick} className='header-menu__item' spy={true} smooth={true} duration={2500}>
                    {url === 'link' ? <a className='font-small' href="https://kadorrgroup.com/" target='_blank'>{name}</a> :
                        url === 'living_complex' ? <NavLink exact={exact} className='font-small' to={`/${lngForLivingComplex(language)}`}>{name}</NavLink> :
                            <NavLink exact={exact} className='font-small' to={`/${language}/${url}`}>{name}</NavLink>
                    }
                </Link>
            )
        };

        export default ItemMenu;
