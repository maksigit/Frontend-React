import React from 'react';

import './kadorr-preloader.scss';
import {withTranslation} from "react-i18next";

const KadorrPreloader = () => {

    return (
        <div id="inTurnFadingTextG">
            <div id="inTurnFadingTextG_1" className="inTurnFadingTextG">K</div>
            <div id="inTurnFadingTextG_2" className="inTurnFadingTextG">A</div>
            <div id="inTurnFadingTextG_3" className="inTurnFadingTextG">D</div>
            <div id="inTurnFadingTextG_4" className="inTurnFadingTextG">O</div>
            <div id="inTurnFadingTextG_5" className="inTurnFadingTextG">R</div>
            <div id="inTurnFadingTextG_6" className="inTurnFadingTextG">R</div>
            {/*<div id="inTurnFadingTextG_7" className="inTurnFadingTextG">.</div>*/}
            {/*<div id="inTurnFadingTextG_8" className="inTurnFadingTextG">.</div>*/}
        </div>
    );
};
export default withTranslation()(KadorrPreloader);