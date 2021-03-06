import React, {useState, useEffect} from 'react';
import {compose} from "recompose";

import icon from "./kadorgroup.svg"

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} from "react-google-maps";
import {STATIC_FILE, replace_path} from "../../helpers/constants";

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
    useEffect(() => {
        if (props.idMarker !== '') {
            const ind = props.data.findIndex(element => element._id === props.idMarker);
            onToggleOpen(ind);
        }
    }, [props.idMarker]);

    const onToggleOpen = id => {
        setIndex(id);
    };

    const onClose = () => {
        setIndex(null);
    };

    const data = props.data;
    const {lat, lng} = props.point;
    const t = props.t;

    return (
        <GoogleMap
            defaultZoom={11}
            defaultCenter={{lat: lat, lng: lng}}
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
            <Marker
                position={{lat: +lat, lng: +lng}}
                icon={icon}
            >
            </Marker>
            {
                data.map((item, index) => {
                    return (

                        <Marker
                            key={item._id}
                            position={{lat: +item.location.coordinate.lat, lng: +item.location.coordinate.lng}}
                            onClick={() => onToggleOpen(index)}
                            icon={icon}
                            id={item._id}
                        >
                            {indexMarker === index && <InfoWindow onCloseClick={onClose}>

                                <div className="info-window">
                                    {item.deadline ? <div className="info-window__deadline font-small">{t('deadline')}: {item.deadline}</div>
                                        : null}

                                    <div className="info-window__desc">{item.description || item.title}</div>

                                    {item.rayon ? <div className="info-window__destrict font-medium">{item.rayon}</div>
                                        : null}
                                    {
                                        item.photoPrewie ? <div className="info-window__img"><img
                                                src={replace_path(STATIC_FILE + item.photoPrewie[0].preview)} alt=""/></div> :
                                            <div className="info-window__img">
                                                <img src={replace_path(STATIC_FILE + item.image[0].preview)} alt=""/></div>
                                    }
                                </div>

                            </InfoWindow>}
                        </Marker>

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
