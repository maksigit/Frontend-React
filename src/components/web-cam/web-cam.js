import React from 'react';

import './web-cam.scss';

const WebCam = ({openCamera, length}) => {
    return (
        <div className='web-cam'>
            <button onClick={openCamera} className='web-cam__btn' >{length > 0 ? 'веб-камера' : ''}</button>
        </div>
    );
};
export default WebCam;
