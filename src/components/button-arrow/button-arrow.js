import React from 'react';
import classNames from 'classnames';
import './button-arrow.scss';

const svgR = <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd"
          d="M10.1008 0.158622C9.89647 -0.0528739 9.55637 -0.0528739 9.34487 0.158622C9.14052 0.362972 9.14052 0.70308 9.34487 0.906955L13.178 4.74008H0.529216C0.23436 4.74055 0 4.97491 0 5.26977C0 5.56462 0.23436 5.80661 0.529216 5.80661H13.178L9.34487 9.63258C9.14052 9.84408 9.14052 10.1847 9.34487 10.3885C9.55637 10.6 9.89695 10.6 10.1008 10.3885L14.8414 5.64798C15.0529 5.44363 15.0529 5.10352 14.8414 4.89965L10.1008 0.158622Z"
          fill="white"/>
</svg>;
const svgL = <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd"
          d="M4.89917 0.158622C5.10353 -0.0528739 5.44363 -0.0528739 5.65513 0.158622C5.85948 0.362972 5.85948 0.70308 5.65513 0.906955L1.82201 4.74008H14.4708C14.7656 4.74055 15 4.97491 15 5.26977C15 5.56462 14.7656 5.80661 14.4708 5.80661H1.82201L5.65513 9.63258C5.85948 9.84408 5.85948 10.1847 5.65513 10.3885C5.44363 10.6 5.10305 10.6 4.89917 10.3885L0.158622 5.64798C-0.0528736 5.44363 -0.0528736 5.10352 0.158622 4.89965L4.89917 0.158622Z"
          fill="white"/>
</svg>;


const ButtonArrow = ({svg = true, id, skewLeft = false, skewRight = false, onClick, disable = false, animated = false}) => {
    return (

        <button id={id}
                className={classNames('btn-arrow btn-primary', {
                    'btn-arrow__skew-left': skewLeft,
                        'btn-arrow__skew-right': skewRight,
                        'btn-arrow__disable': disable,
                        '' : animated
                })}
                onClick={onClick}
        >
            <span>{svg ? svgR : svgL}</span>
        </button>
    );
};

export default ButtonArrow;