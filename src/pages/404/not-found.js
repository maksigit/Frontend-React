import React, {useEffect} from 'react';

import './not-found.scss'

import bg404 from './404.jpg';
import TitleSection from "../../components/title-section";
import Button from "../../components/button/button";

const toHome = () => {
    window.location = '/'
};

export default (props) => {

    useEffect(() => {
        document.querySelector('body').classList.add('done');
        document.querySelector('header').classList.add('main-header__scroll');
    }, []);

    return (
        <div className='wrap-not-found'>
            <img src={bg404} alt=""/>

            <div className='not-found'>
                <div className='not-found__title'>
                    <TitleSection titleSection='страница не найдена'/>
                </div>
                <div className='not-found__btn'>
                    <Button
                        onClick={toHome}
                        label='вернуться на главную'
                        skew={true}
                    />
                </div>
            </div>
        </div>
    );
};
