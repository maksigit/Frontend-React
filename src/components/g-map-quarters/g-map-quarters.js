import React, {useState, useEffect} from 'react';
import {compose} from "recompose";

import icon from "./kadorgroup.svg"

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";
import {STATIC_FILE, replace_path} from "../../helpers/constants";
import activeIconSvg from "../g-map-home/pin_active.svg";
import {Link} from "react-router-dom";

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

const MapWithAMakredInfoWindow = props => {
    const [indexMarker, setIndex] = useState(null);
    const [activeIcon, setActiveIcon] = useState(null);
    useEffect(() => {
        if (props.currentItemId !== '') {
            const ind = props.data.findIndex(element => element._id === props.currentItemId);
            onToggleOpen(ind, props.currentItemId);
        }

    }, [props.currentItemId, props.currentCityFromLocation]);

    const onToggleOpen = (id, itemId) => {
        setActiveIcon(itemId);
        setIndex(id);
    };

    const onClose = () => {
        setIndex(null);
        setActiveIcon(null);
    };

    const data = props.data;
    let currentIndex = null;
    const t = props.t;

    return (
        <GoogleMap
            defaultZoom={13}
            defaultCenter={{lat: 46.469391, lng: 30.740883}}
            styles={[
                {
                    "featureType": "all",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "weight": "2.00"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#9c9c9c"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "on"
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
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
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
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#7b7b7b"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#ffffff"
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
                            "color": "#46bcec"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#c8d7d4"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#070707"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                }
            ]}
            defaultOptions={{styles: stylesArr}}
        >
            {
                data.map((item, index) => {
                    currentIndex = index;
                    return (
                        <div>
                            <Marker
                                key={item._id}
                                position={{lat: +item.coordinate.x.lat, lng: +item.coordinate.x.lng}}
                                onClick={() => onToggleOpen(index, item._id)}
                                icon={activeIcon === item._id ? activeIconSvg : icon}
                                id={item._id}
                            >
                            </Marker>
                            {indexMarker === index &&
                            <div className='wrap-info-window-on-home'>
                                <div className="info-window">
                                    {item.deadline ? <div className="info-window__deadline font-small">{t('deadline')}: {item.deadline}</div>
                                        : null}

                                    <Link to={`/${props.language}/living_complex/${item.url}`} className="info-window__desc">{item.description || item.title}</Link>

                                    {item.address ? <div className="info-window__destrict font-medium">{item.address}</div>
                                        : null}
                                    {
                                        item.photoPrewie ? <Link to={`/${props.language}/${props.currentCategory}/${item.seo}`} className="info-window__img"><img
                                                src={replace_path(STATIC_FILE + item.photoPrewie[0].path)} alt=""/></Link> :
                                            <div className="info-window__img">
                                                <img
                                                src={replace_path(STATIC_FILE + item.image[0].path)} alt=""/></div>
                                    }
                                </div>
                                <div className='close-info-window' onClick={onClose}>
                                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M6.47283 5.50011L10.7984 1.17432C11.0672 0.905793 11.0672 0.470095 10.7984 0.201568C10.5297 -0.0671892 10.0945 -0.0671892 9.82573 0.201568L5.50011 4.52736L1.17427 0.201568C0.905526 -0.0671892 0.470305 -0.0671892 0.201559 0.201568C-0.0671864 0.470095 -0.0671864 0.905793 0.201559 1.17432L4.5274 5.50011L0.201559 9.82591C-0.0671864 10.0944 -0.0671864 10.5301 0.201559 10.7987C0.335932 10.9328 0.512039 11 0.687916 11C0.863793 11 1.0399 10.9328 1.17427 10.7984L5.50011 6.47264L9.82573 10.7984C9.9601 10.9328 10.1362 11 10.3121 11C10.488 11 10.6641 10.9328 10.7984 10.7984C11.0672 10.5299 11.0672 10.0942 10.7984 9.82568L6.47283 5.50011Z"
                                              fill="black"/>
                                    </svg>
                                </div>
                            </div>
                            }
                        </div>
                    )
                })
            }
        </GoogleMap>
    )
};

export default compose(
    withScriptjs,
    withGoogleMap
)(MapWithAMakredInfoWindow);
