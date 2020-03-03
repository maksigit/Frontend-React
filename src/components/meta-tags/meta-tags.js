import React from 'react';
import classNames from 'classnames';

import './meta-tags.scss';
import {withTranslation} from "react-i18next";
import Helmet from "react-helmet/es/Helmet";

// MetaTags({
//     title: main.title,
//     seo_title: main.see.title
// })

const MetaTags = ({seo}) => {
        const {title, description, seoTitle, seoDescription} = seo;

    return (
        <Helmet>
            {/*HTML Meta Tags*/}
            <title>{seoTitle ? seoTitle : title}</title>
            <meta name="description" content={description ? description : seoDescription}/>
            {/*Google / Search Engine Tags*/}
            <meta itemprop="name" content={seoTitle ? seoTitle : title}/>
            <meta itemprop="description" content={description ? description : seoDescription}/>
            <meta itemprop="image" content="$OG_IMAGE"/>
            {/*Facebook Meta Tags*/}
            <meta property="og:url" content="$OG_URL"/>
            <meta property="og:type" content="website"/>
            <meta property="og:title" content={seoTitle ? seoTitle : title}/>
            <meta property="og:description" content={description ? description : seoDescription}/>
            <meta property="og:image" content="$OG_IMAGE"/>
            {/*Twitter Meta Tags*/}
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content={seoTitle ? seoTitle : title}/>
            <meta name="twitter:description" content={description ? description : seoDescription}/>
            <meta name="twitter:image" content="$OG_IMAGE"/>
        </Helmet>
    );
};
export default (MetaTags);