import React, { Component } from 'react'

import './insta-feed.scss';
import {withTranslation} from "react-i18next";


class InstaFeed extends Component {

    componentDidMount() {
        var feed = new window.Instafeed({
            accessToken: '320324639.1677ed0.9fceaa7d2cf24219a2f2754ab39c88d5',
            get: 'user',
            userId: '320324639',
            template: '<li><a target="_blank" href="{{link}}" id="{{id}}" class="instagram-block"><img src="{{image}}" class="instagram-image" /><span class="instagram-icon"></span></a></li>',
            resolution: 'standard_resolution',
            limit: window.innerWidth < 413 ? 3 : 5
        });
        feed.run();
    }

    render() {
        const t = this.props.t;
 
        return (
            <div className='wrap-instagram'>
                <div className='font-large'>{t('Follow us')}</div>
                <a href="https://www.instagram.com/kadorrgroup/" className='font-small__upper' target='_blank'>@kadorrgroup</a>
                <ul id="instafeed" className="instagram-list"></ul>
            </div>
        )
    }
}

export default withTranslation()(InstaFeed);