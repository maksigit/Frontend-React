import React from 'react';

import './title-desc-modal-form.scss';


const TitleDescModalForm = ({title, desc}) => {

    return (
        <div className='title-desc-modal-form'>
            <div className='title-section'>{title}</div>
            <div className='font-medium'>{desc}</div>
        </div>
    );
};
export default TitleDescModalForm;
