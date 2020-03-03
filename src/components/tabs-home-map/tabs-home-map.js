import React, {Component} from 'react';
import {STATIC_FILE, replace_path} from "../../helpers/constants";

import './tabs-home-map.scss';
import GMapHome from "../g-map-home/g-map-home";

const tabs = [
    {
        label: 'all',
        name: 'all'
    },
    {
        label: 'RC',
        name: 'living_complex'
    },
    {
        label: 'Quarters',
        name: 'quarters'
    },
    {
        label: 'commerce',
        name: 'commerce'
    },
    {
        label: 'Business centers',
        name: 'business_center'
    },
    {
        label: 'shopping_center',
        name: 'shopping_center'
    },
];

class TabsHomeMap extends Component {

    state = {
        activeCurrentCategory: this.props.currentCategory
    };

    tabToggle = (category) => () => {
        this.props.getCoordinates(category);
        this.setState({
            activeCurrentCategory: category
        })
    };

    componentDidMount() {
        const callback  = this.tabToggle(this.props.currentCategory);
        callback();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.currentCategory !== this.props.currentCategory) {
            this.setState({
                activeCurrentCategory: this.props.currentCategory
            })
        }
    }

    render() {
        const data = this.props.item;
        const dataLength = data.length;
        const arrows = this.props.arrows;
        const t = this.props.t;
        const language = this.props.language;
        const currentCategory = this.props.currentCategory;

        return (
            <div className='tabs'>
                {dataLength < 6 ? <div className='tabs__arrows'></div> :
                    arrows === true && <div className='tabs__arrows'>
                    </div>
                }
                <div className='tabs__top'>
                    <div className='tabs__top-wrap-overflow'>
                        {
                            tabs.map((item, index) => {
                                return (
                                    <div key={item.label} onClick={this.tabToggle(item.name)}
                                         className={this.state.activeCurrentCategory === item.name ? 'tabs__item active' : 'tabs__item'}>
                                        <div className='tabs__item-intro font-small'>
                                            {t(item.label)}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='tabs__bottom'>
                    {arrows === true ? <div className='tabs__bottom-flex'>
                            <div className='tabs__top-active'
                                 style={{width: ((this.state.tabIndex + 1) * (100 / dataLength)) + '%'}}> </div>
                            <img src={replace_path(`${STATIC_FILE}${data[this.state.tabIndex].image[0].path}`)} alt='advantage'/>
                            <div className='tabs__bottom-img-desc font-medium'>{data[this.state.tabIndex].description}</div>
                        </div> :
                        <GMapHome
                            language={language}
                            currentCategory={currentCategory}
                            mapInitCity={this.props.mapInitCity}
                            idMarker={this.props.idMarker}
                            googleMapURL={window.google}
                            loadingElement={<div style={{height: `100%`}}/>}
                            containerElement={<div style={{height: `6rem`}}/>}
                            mapElement={<div style={{height: `100%`}}/>}
                            data={data}
                            currentCityFromLocation={this.props.currentCityFromLocation}
                            t={this.props.t}
                            currentItemId={this.props.currentItemId}
                        />
                    }
                </div>
            </div>
        )
    }
}

export default TabsHomeMap;