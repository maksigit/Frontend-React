import React, {Component} from 'react';
import './characteristics.scss';

class Characteristics extends Component {
    render() {
        const {data, title, moreBtn, t} = this.props;
        return (
            <div className="characteristics">

                <div className='characteristics__top'>
                    <div className='characteristics__title-section title-section'>{title}</div>
                    {
                        moreBtn > 0 ? <button onClick={this.props.openCharacter} className='characteristics__more'>
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="5" width="11" height="1" fill="#BEA972"/>
                        <rect x="6" width="11" height="1" transform="rotate(90 6 0)" fill="#BEA972"/>
                        </svg>
                        <div className='font-small'>{t('details')}</div>
                        </button> : ''
                    }

                </div>
                <div className='characteristics__bottom'>
                    {
                        data.map((item, index) => {
                            if (index < 6) {
                                return (
                                    <div key={item._id} className='characteristics__item'>
                                        <div className='characteristics__count'>{item.headline}</div>
                                        <div className='characteristics__rectangle'> </div>
                                        <div className='characteristics__title font-small'>{item.description}</div>
                                    </div>
                                )
                            }

                        })
                    }
                </div>
            </div>
        );
    }
}

export default Characteristics;