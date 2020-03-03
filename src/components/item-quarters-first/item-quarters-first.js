import React, { Component } from 'react';
import classNames from 'classnames';

import { STATIC_FILE, replace_path } from '../../helpers/constants';

import './item-quarters-first.scss';

class ItemQuartersFirst extends Component {

    render() {
        const {img, title, location, revers = false, fullWith = false,} = this.props;
        return (
            <div className={classNames('wrap-item-residential-first', {
                'item-residential__revers-first': window.innerWidth < 413 ? false : revers,
                'item-residential__flex-dir-first': window.innerWidth < 413 ? false : fullWith
            })}>

                <div
                    className={classNames('item-residential')}
                >
                    <div
                        className={classNames('item-residential__wrap-img quarters-single', { 'item-residential__full-width': window.innerWidth < 413 ? false : fullWith })}>
                        {img &&
                            <div className="item-img-cont">
                                <img src={replace_path(`${STATIC_FILE}${img}`)}  className='item-residential__img' />
                            </div>
                        }
                    </div>
                </div>
                <div className='item-residential__wrap-info-first'>
                    {
                        title !== '<p><br></p>' && <div className='font-large' dangerouslySetInnerHTML={{ __html: title }}/>
                    }
                    <div className='font-medium'>{location}</div>
                </div>
            </div>
        )
    }
}

export default ItemQuartersFirst;