import React from 'react';

import './phone-number.scss';


const PhoneNumber = ({number}) => {
        const phoneNumber = number.substr(3).replace(/(\d\d\d)(\d\d\d)(\d\d)(\d\d)/, "($1) $2-$3-$4");
    return (

        <a href={`tel:${number}`} className='phone-number'>
            {phoneNumber}
        </a>
    );
};
export default PhoneNumber;