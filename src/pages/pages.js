import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import Header from '../modules/header';
import Footer from '../modules/footer';
import Home from '../pages/home';
import QuartersSingle from '../pages/quarters-single';
import ResidentialSingle from '../pages/residential-single';
import Kids from '../pages/kids';
import NotFound from '../pages/404';
import {GOOGLE_API_KEY} from "../helpers/helpers";
import {connect} from "react-redux";
import {
    clearPageHousing,
    clearPageQuarters,
    currentItemId,
    fetchCoordinates,
    fetchItemByCity,
    fetchItemByFilter,
    fetchItemByFilterQuarters,
    fetchItemLoadMore,
    fetchWelcome,
    getMapId, getSeo, loadedImg,
    loadMore,
    loadMoreQuarters,
    setCity,
    setCityQuarters,
    setDistrict,
    setDistrictQuarters,
    setMapCity,
    setStatus,
    setStatusQuarters
} from "./home/services/action";
import {closeForm, openForm, singleFetchData} from "./residential-single/services/action";
import {quartersFetchData} from "./quarters-single/services/action";
import {
    changeLanguage,
    getCurrentCategory,
    getNameItemMenu,
    setCurrentCityFromLocation, setCurrentIndexCategories
} from "../modules/header/services/action";

// ========================================= Страницы =========================================
// const Home = lazy(() => import('../pages/home'));
// const Contact = lazy(() => import('../pages/contact'));
// const About = lazy(() => import('../pages/about'));
// const ResidentialSingle = lazy(() => import('../pages/residential-single'));
// const NotFound = lazy(() => import('../pages/404'));
//
// const Header = lazy(() => import('../modules/header'));
// const Footer = lazy(() => import('../modules/footer'));

class MainRoutes extends Component {

    loader = _success => {
        const obj = document.querySelector('.main-preloader');
        const inner = document.querySelector('.preloader-percentage');
        const timeline = document.querySelector('.progress');
        const page = document.querySelector('.main-header');
        obj.classList.add('show');
        page.classList.remove('show');
        let w = 4;
        const t = setInterval(() => {
            if (w !== 99) {
                w = w + 1;
                inner.textContent = w + '%';
                timeline.style.width = w + '%';
            }
            if (w === 99) {
                obj.classList.remove('show');
                obj.classList.add('hide');
                page.classList.add('show');
                w = w + 1;
                inner.textContent = w + '%';
                timeline.style.width = w + '%';
                clearInterval(t);
                w = 0;
                if (_success) {
                    return _success();
                }
            }
        }, 20);
    };

    getCurrentlocation = async (lat, lng) => {
        const request = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${GOOGLE_API_KEY}`);
        const cord = await request.json();

        if (true) {
            this.props.setCurrentCityFromLocation('kiev')
        } else {
            this.props.setCurrentCityFromLocation('odessa')
        }
    };

    componentDidMount() {
        if (sessionStorage.getItem('loader') !== 'done') {
            setTimeout(() => {
                document.querySelector('body').classList.add('done');
                sessionStorage.setItem('loader', 'done');
            }, 2000);
            this.loader();
            navigator.geolocation.getCurrentPosition(async (position, error) => {
                const {latitude, longitude} = position.coords;
                await this.getCurrentlocation(latitude, longitude)
            });

        } else {
            document.querySelector('body').classList.add('done');
            document.querySelector('.main-preloader').classList.add('d-none');
        }
    }

    componentWillUnmount() {

    }

    render() {

        return (
            <>
                <Header {...this.props} />
                <Switch>
                    <Route path={[
                        "/",
                        "/ru",
                        "/ua",
                        "/en"
                    ]} exact={true} component={Home}
                    />

                    <Route path={[
                        "/ru/pages/:id",
                        "/ua/pages/:id",
                        "/en/pages/:id"
                    ]} component={Kids} />

                    {/*<Route path="/:language/:currentcategory/:id" component={ResidentialSingle} />*/}

                    <Route path={["/", "/:language/:category"]} exact={true} component={Home} />
                    <Route path="/:language/quarters/:id" exact={true} component={QuartersSingle} />
                    <Route path={"/:language/:currentcategory/:id"} component={ResidentialSingle} />

                    <Route component={NotFound} />
                </Switch>
                <Footer />
                <div className="main-preloader">
                    <div className="preloader-inner">
                        <div className="progress">
                            <div className="preloader-percentage"/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


const mapDispatchToProps = {
    setCurrentCityFromLocation,
};

export default connect(null, mapDispatchToProps)(MainRoutes);
