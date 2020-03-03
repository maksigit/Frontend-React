import React from 'react';
import classNames from 'classnames';

import './input.scss';


const Input = ({label, value, valid = null, changeValue, name, mask, errorMessage, maskPhone = false}) => {

    return (
        <div className={classNames('form-field', {'form-field__error': valid})}>
            <input
                type="text"
                className='form-input'
                name={name}
                value={value}
                onChange={changeValue}
                required
            />
            <span className='floating-label'>{valid ? errorMessage : label}</span>
            {maskPhone && <span className='floating-phone'>+38(0</span>}
        </div>
    );
};
export default Input;
