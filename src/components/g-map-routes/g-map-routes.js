/* global google*/
import React from 'react';
import classNames from "classnames";

import _ from 'lodash';
import {compose, withProps, lifecycle} from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    DirectionsRenderer
} from 'react-google-maps';

import {GOOGLE_API_KEY} from "../../helpers/helpers";

import {SearchBox} from 'react-google-maps/lib/components/places/SearchBox';

import './g-map-routes.scss'
import MyIcon from "../my-icon";
import CitySelectGetToUs from "../city-select-get-to-us";

const stylesArr = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#b6dae0"
            },
            {
                "visibility": "on"
            }
        ]
    }
];

const minusSvg = <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M3 4L0 0.181818L6 0.181818L3 4Z" fill="white"></path>
</svg>;

const plusSvg = <svg className="rotate" width="6" height="4" viewBox="0 0 6 4" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M3 4L0 0.181818L6 0.181818L3 4Z" fill="white"></path>
</svg>;

const MapWithASearchBox = compose(
    withProps({
        googleMapURL: window.google, loadingElement: <div style={{height: '100%'}}/>,
        containerElement: <div style={{height: '6rem'}}/>,
        mapElement: <div style={{height: '100%'}}/>
    }),
    lifecycle({
        componentWillMount() {
            const refs = {};
            this.setState({
                bounds: null,
                directions: null,
                markers: [],
                transit: true,
                driving: true,
                parking: true,
                steps: [],
                toggleMainPoint: {},
                onMapMounted: ref => {
                    refs.map = ref;
                },
                onBoundsChanged: () => {
                    this.setState({
                        bounds: refs.map.getBounds(),
                        center: refs.map.getCenter()
                    });
                },
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onSearchBoxMountedTransit: ref => {
                    refs.searchBoxTransit = ref;
                },
                onSearchBoxMountedParking: ref => {
                    refs.searchBoxParking = ref;
                },
                onPlacesChanged: () => {

                    const places = refs.searchBox.getPlaces();
                    const bounds = new google.maps.LatLngBounds();

                    const {placeId} = this.props;

                    const origin = {placeId: places[0].place_id};
                    const destination = {placeId: this.props.city === 'kiev' ? 'ChIJcxgwbWjP1EARFsTJiRCRZ8Q' : 'ChIJwa1QLXYxxkARAvhtsNKvHJQ'};

                    this.directionsService.route(
                        {
                            origin,
                            destination,
                            travelMode: google.maps.TravelMode.DRIVING
                        },
                        (result, status) => {
                            if (status === google.maps.DirectionsStatus.OK) {
                                this.setState({
                                    directions: result,
                                });
                            } else {
                                console.error(`error fetching directions ${result}`);
                            }
                        }
                    );

                    places.forEach(place => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport);
                        } else {
                            bounds.extend(place.geometry.location);
                        }
                    });
                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location
                    }));
                    const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

                    this.setState({
                        center: nextCenter,
                        markers: nextMarkers
                    });
                },
                onPlacesChangedTransit: () => {

                    const places = refs.searchBoxTransit.getPlaces();
                    const bounds = new google.maps.LatLngBounds();

                    const {placeId} = this.props;

                    const origin = {placeId: places[0].place_id};
                    const destination = {placeId: this.props.city === 'kiev' ? 'ChIJcxgwbWjP1EARFsTJiRCRZ8Q' : 'ChIJwa1QLXYxxkARAvhtsNKvHJQ'};


                    this.directionsService.route(
                        {
                            origin,
                            destination,
                            travelMode: google.maps.TravelMode.TRANSIT
                        },
                        (result, status) => {
                            if (status === google.maps.DirectionsStatus.OK) {
                              
                                this.setState({
                                    directions: result,
                                    steps: result.routes[0].legs[0].steps
                                });
                            } else {
                               
                            }
                        }
                    );

                    places.forEach(place => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport);
                        } else {
                            bounds.extend(place.geometry.location);
                        }
                    });
                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location
                    }));
                    const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

                    this.setState({
                        center: nextCenter,
                        markers: nextMarkers
                    });
                },

                cutStepString: (str) => {
                    let indexChar = 0;
                    for (let i = 0; i < str.length; i++) {
                        if (str[i] === ',' && indexChar !== 1) {
                            indexChar++;
                        } else if (str[i] === ',' && indexChar === 1) {
                            return str.slice(0, i)
                        }
                    }
                    return str
                },

                toggleTransit: () => {
                    if (this.state.transit == true) {
                        this.setState({
                            driving: true
                        })
                        this.setState({
                            parking: true
                        })
                    }
                    this.setState({
                        transit: !this.state.transit
                    })
                },
                toggleDriving: () => {
                    if (this.state.driving == true) {
                        this.setState({
                            transit: true
                        })
                        this.setState({
                            parking: true
                        })
                    }
                    this.setState({
                        driving: !this.state.driving
                    })
                },
                toggleParking: () => {
                    if (this.state.parking == true) {
                        this.setState({
                            transit: true
                        });
                        this.setState({
                            driving: true
                        })
                    }
                    this.setState({
                        parking: !this.state.parking
                    })
                },
            });
        },

        async componentDidMount() {
            const request = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${this.props.trueOrFalseCity ? 'ChIJcxgwbWjP1EARFsTJiRCRZ8Q' : 'ChIJwa1QLXYxxkARAvhtsNKvHJQ'}&key=${GOOGLE_API_KEY}`);
            const cord = await request.json();
            const currentAddress = cord.results[0].address_components[1].long_name + ', ' + cord.results[0].address_components[0].long_name;
            this.setState({
                directions: null,
                fullAddress: currentAddress,
                toggleMainPoint: cord.results[0].geometry.location
            });
            setTimeout(() => {
                this.directionsService = new google.maps.DirectionsService();
            }, 5000);
        },

        async componentDidUpdate(prevProps, prevState) {
            if (prevProps.trueOrFalseCity !== this.props.trueOrFalseCity || prevProps.city !== this.props.city) {
                const request = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${this.props.trueOrFalseCity ? 'ChIJcxgwbWjP1EARFsTJiRCRZ8Q' : 'ChIJwa1QLXYxxkARAvhtsNKvHJQ'}&key=${GOOGLE_API_KEY}`);
                const cord = await request.json();
                const currentAddress = cord.results[0].address_components[1].long_name + ', ' + cord.results[0].address_components[0].long_name;
                this.setState({
                    directions: null,
                    fullAddress: currentAddress,
                    toggleMainPoint: cord.results[0].geometry.location
                });
                setTimeout(() => {
                    this.directionsService = new google.maps.DirectionsService();
                }, 5000);
            }
            if (prevProps.city !== this.props.city) {
                const request = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${this.props.city === 'kiev' ? 'ChIJcxgwbWjP1EARFsTJiRCRZ8Q' : 'ChIJwa1QLXYxxkARAvhtsNKvHJQ'}&key=${GOOGLE_API_KEY}`);
                const cord = await request.json();
                const currentAddress = cord.results[0].address_components[1].long_name + ', ' + cord.results[0].address_components[0].long_name;
                this.setState({
                    directions: null,
                    fullAddress: currentAddress,
                    toggleMainPoint: cord.results[0].geometry.location
                });
                setTimeout(() => {
                    this.directionsService = new google.maps.DirectionsService();
                }, 5000);
            }
        }
    }),
    withScriptjs,
    withGoogleMap
)(props => {
        const {t} = props;
        return (
            <GoogleMap
                ref={props.onMapMounted}
                defaultZoom={11}
                center={props.city === 'kiev' ? {lat: 50.412752, lng: 30.550927} : {lat: 46.4748234, lng: 30.7466109}}
                defaultOptions={{styles: stylesArr}}
            >
                <div onClick={props.closeChooseCity} className='search-box__wrap'>
                    <div className='search-box__title title-section'><span>{t('Get to us at')}</span>
                        <CitySelectGetToUs
                        currentCityFromLocation={props.city}
                        getCurrentCity={props.toggleCity}
                        setCurrentCityFromLocation={props.setCurrentCity}
                        />
                    </div>
                    <SearchBox
                        ref={props.onSearchBoxMountedTransit}
                        bounds={props.bounds}
                        controlPosition={google.maps.ControlPosition.TOP_LEFT}
                        onPlacesChanged={props.onPlacesChangedTransit}
                    >
                        <div className={classNames('search-box__item search-box__transit', {
                            'search-box__open': !props.transit,
                            'search-box__close': props.transit,
                        })}>
                            <div onClick={props.toggleTransit}
                                 className='search-box__title font-small'>{t('public transport')} {props.transit ? minusSvg : plusSvg}
                            </div>
                            <div className={classNames('search-box__routes', {
                                'search-box__routes-close': props.transit,
                            })}>
                                <div className='search-box__input'>
                                    <input
                                        type="text"
                                        placeholder={t('Enter your location')}
                                    />
                                </div>
                                <div className='search-box__dash'> -</div>
                                <input className='search-box__address' value={props.fullAddress}/>
                            </div>
                            <div className={classNames('search-box__steps', {
                                'search-box__routes-close': props.transit,
                            })}>
                                {
                                    props.steps.map((item) => {
                                        return (
                                            <div className='search-box__step font-small'>
                                                {props.cutStepString(item.instructions) + ', ' + item.distance.text + ', около ' + item.duration.text}
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                    </SearchBox>
                    <SearchBox
                        ref={props.onSearchBoxMounted}
                        bounds={props.bounds}
                        controlPosition={google.maps.ControlPosition.TOP_CENTER}
                        onPlacesChanged={props.onPlacesChanged}
                    >
                        <div className={classNames('search-box__item search-box', {
                            'search-box__open': !props.driving,
                            'search-box__close': props.driving,
                        })}>
                            <div onClick={props.toggleDriving}
                                 className='search-box__title font-small'>{t('get directions')} {props.driving ? minusSvg : plusSvg}                        </div>
                            <div className={classNames('search-box__routes', {
                                'search-box__routes-close': props.driving,
                            })}>
                                <div className='search-box__input'>
                                    <input
                                        type="text"
                                        placeholder={t('Enter your location')}
                                    />
                                </div>
                                <div className='search-box__dash'> -</div>
                                <div className='search-box__address'>{props.fullAddress}</div>
                            </div>

                        </div>
                    </SearchBox>

                    <SearchBox
                        ref={props.onSearchBoxMountedParking}
                        bounds={props.bounds}
                        controlPosition={google.maps.ControlPosition.TOP_RIGHT}
                        onPlacesChanged={props.onPlacesChangedTransit}
                    >
                        <div className={classNames('search-box__item search-box__parking', {
                            'search-box__open': !props.parking,
                            'search-box__close': props.parking,
                        })}>
                            {props.infoParking.length !== 0 && <div>
                                <div onClick={props.toggleParking}
                                     className='search-box__title font-small'>{t('parking information')} {props.parking ? minusSvg : plusSvg}
                                </div>
                                <div className={classNames('search-box__routes font-small', {
                                    'search-box__routes-close': props.parking,
                                })}>
                                    {props.infoParking}
                                </div>
                            </div>
                            }
                        </div>
                    </SearchBox>


                    <div className="searcheBackground"></div>
                </div>

                <DirectionsRenderer
                    directions={props.directions}
                    options={{
                        markerOptions: {
                            visible: false,
                        },
                        polylineOptions: {
                            strokeColor: "#BEA972"
                        }
                    }}

                />
                {props.markers.map((marker, index) =>
                    <Marker key={index} position={marker.position}
                            icon={MyIcon('pina')}
                    />
                )}
                <Marker
                    position={props.toggleMainPoint}
                    icon={MyIcon('kadorr')}
                >
                </Marker>
            </GoogleMap>
        );
    }
);

export default MapWithASearchBox;
