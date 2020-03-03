import React, {Component} from 'react';
import './tabs-quarters-map.scss';
import GMapQuarters from "../g-map-quarters/g-map-quarters";



class TabsQuartersMap extends Component {
    state = {
        tabIndex: 0,
        page: 0,
        data: []
    };

    tabToggle = (tabIndex, itemName) => () => {
        const coords = this.props.item.filter((item) => item.categories.name === itemName);

        this.setState({
            tabIndex: tabIndex,
            data: coords
        });
    };

    pageNext = () => {
        if ((this.state.page + 1) >= (this.props.item.length / 6)) return;
        this.setState((prevState) => {
            return {
                ...prevState,
                page: prevState.page + 1
            }
        })
    };

    allMarkets = (data) => {
        return data.reduce((total, element) => {
            return [...total, element.coordinate];
        }, []);
    };

    pagePrev = () => {
        if (this.state.page < 1) return;

        this.setState((prevState) => {
            return {
                ...prevState,
                page: prevState.page - 1
            }
        })
    };


    render() {
        const data = this.state.data;
        const dataLength = data.length;
        const arrows = this.props.arrows;
        const t = this.props.t;

        return (
            <div className='tabs'>
                {dataLength < 6 ? <div className='tabs__arrows'></div> :
                    arrows === true && <div className='tabs__arrows'>
                    </div>
                }
                <div className='tabs__bottom'>
                    <GMapQuarters
                        idMarker={this.props.idMarker}
                        googleMapURL={window.google}
                        loadingElement={<div style={{height: `100%`}}/>}
                        containerElement={<div style={{height: `6rem`}}/>}
                        mapElement={<div style={{height: `100%`}}/>}
                        data={this.state.tabIndex === 0 ? this.props.item : this.state.data}
                 
                        t={this.props.t}
                        language={this.props.language}
                        currentCategory={this.props.currentCategory}
                        currentItemId={this.props.currentItemId}
                        currentCityFromLocation={this.props.currentCityFromLocation}
                    />
                </div>
            </div>
        )

    }
}

export default TabsQuartersMap;