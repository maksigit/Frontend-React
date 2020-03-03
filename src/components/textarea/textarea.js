import React from 'react';

import './textarea.scss';
import classNames from "classnames";

const Textarea = ({label, value, changeValue, errorMessage, valid = null, name}) => {

    return (
        <div className={classNames('form-field', {'form-field__error': valid})}>
            <textarea
                className='form-textarea'
                name={name}
                onChange={changeValue}
                required
                value={value}
            />

            <span className='floating-label'>{valid ? errorMessage : label}</span>
        </div>
    );
};
export default Textarea;