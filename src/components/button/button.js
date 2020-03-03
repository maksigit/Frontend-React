import React from 'react';
import classNames from 'classnames';

import './button.scss';
import {withTranslation} from "react-i18next";


const Button = ({label, skew = false, onClick, fullWith = false, bgColor = false, svg = false}) => {
    svg = svg && <svg width="13" height="26" viewBox="0 0 13 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M0.0696626 0L13 12.9303L0 25.2488L0.0696626 0Z" fill="white"/>
    </svg>;

    return (
        <button
            className={classNames('btn-primary', {
                'btn-primary__skew': skew,
                'btn-primary__full-with': fullWith,
                'btn-primary__black': bgColor
            })}
            onClick={onClick}
        >
            {svg}
            <span>{label}</span>
        </button>
    );
};
export default withTranslation()(Button);