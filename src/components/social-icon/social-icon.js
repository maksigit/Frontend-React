import React from 'react';

import './social-icon.scss';


const SocialIcon = (props) => {

    const {icons} = props;

    const iconsTag = {
        facebook: <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.76379 0.00270487L5.07798 0C3.18403 0 1.96008 1.25573 1.96008 3.19932V4.67442H0.265077C0.118608 4.67442 0 4.79316 0 4.93963V7.07688C0 7.22335 0.118744 7.34196 0.265077 7.34196H1.96008V12.7349C1.96008 12.8814 2.07869 13 2.22516 13H4.43666C4.58313 13 4.70174 12.8813 4.70174 12.7349V7.34196H6.68359C6.83006 7.34196 6.94867 7.22335 6.94867 7.07688L6.94948 4.93963C6.94948 4.8693 6.92149 4.80195 6.87185 4.75218C6.82222 4.70241 6.7546 4.67442 6.68427 4.67442H4.70174V3.42396C4.70174 2.82294 4.84496 2.51783 5.62788 2.51783L6.76352 2.51742C6.90985 2.51742 7.02846 2.39868 7.02846 2.25234V0.267782C7.02846 0.121584 6.90999 0.00297535 6.76379 0.00270487Z"
                fill="white"/>
        </svg>,
        youtube: <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M11.774 0.0805C12.6131 0.12775 13.0252 0.252 13.405 0.9275C13.8005 1.60212 14 2.76413 14 4.81075V4.81337V4.81775C14 6.85475 13.8005 8.0255 13.4059 8.69312C13.0261 9.36862 12.614 9.49113 11.7749 9.548C10.9358 9.59613 8.82788 9.625 7.00175 9.625C5.17212 9.625 3.06337 9.59612 2.22513 9.54712C1.38775 9.49025 0.975625 9.36775 0.592375 8.69225C0.20125 8.02462 0 6.85388 0 4.81687V4.81512V4.8125V4.80988C0 2.76413 0.20125 1.60212 0.592375 0.9275C0.975625 0.251125 1.38863 0.12775 2.226 0.079625C3.06337 0.023625 5.17212 0 7.00175 0C8.82788 0 10.9358 0.023625 11.774 0.0805ZM9.625 4.8125L5.25 2.1875V7.4375L9.625 4.8125Z"
                  fill="white"/>
        </svg>,
        instagram: <svg width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M3.568 0H9.36c1.968 0 3.568 1.6 3.568 3.568V9.36c0 1.967-1.6 3.567-3.568 3.567H3.568A3.572 3.572 0 010 9.361V3.568C0 1.6 1.6 0 3.568 0zM9.36 11.781a2.423 2.423 0 002.42-2.42V3.568a2.423 2.423 0 00-2.42-2.42H3.567a2.423 2.423 0 00-2.42 2.42V9.36a2.423 2.423 0 002.42 2.42H9.36z"
                  fill="#fff"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M3.133 6.464a3.335 3.335 0 013.331-3.33 3.335 3.335 0 013.331 3.33 3.335 3.335 0 01-3.33 3.331 3.335 3.335 0 01-3.332-3.33zm1.147 0c0 1.205.98 2.184 2.184 2.184 1.204 0 2.184-.98 2.184-2.184 0-1.204-.98-2.184-2.184-2.184-1.204 0-2.184.98-2.184 2.184z"
                  fill="#fff"/>
            <path
                d="M9.935 2.16a.844.844 0 00-.841.842c0 .22.09.438.247.595a.848.848 0 00.594.246.85.85 0 00.595-.246.845.845 0 00-.595-1.436z"
                fill="#fff"/>
        </svg>

    };

    return (
        <div className='wrap-social'>
            {
                icons.map((item) => {
                   if (item.href.length > 0) {
                       return (
                           <a href={item.href} className='social-icon' target="_blank">
                               {iconsTag[item.key]}
                           </a>
                       )
                   }
                })
            }
        </div>
    );
};
export default SocialIcon;