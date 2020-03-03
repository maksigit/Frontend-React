import axios from 'axios';
import {isDevice, isMobile, translate_language} from '../../../helpers/helpers'
import {
    HOME_FETCH_HOUSING_SUCCESS,
    HOME_FETCH_HOUSING_GET_COORDINATES,
    HOME_FETCH_HOUSING_GET_WELCOME,
    HOME_FETCH_HOUSING_NEXT_PAGE,
    HOME_FETCH_HOUSING_NEXT_PAGE_QUARTETS,
    HOME_GET_MAP_ID,
    HOME_FETCH_ITEMS_BY_CITY,
    QUARTERS_FETCH_DATA_REQUEST,
    HOME_FETCH_ITEMS_BY_FILTER,
    HOME_FETCH_ITEMS_BY_FILTER_QUARTERS,
    HOME_SET_CITY,
    HOME_SET_STATUS,
    HOME_SET_DISTRICT,
    HOME_SET_CITY_QUARTERS,
    HOME_SET_STATUS_QUARTERS,
    HOME_SET_DISTRICT_QUARTERS,
    HOME_LOAD_MORE,
    HOME_LOAD_MORE_QUARTERS,
    CLEAR_PAGE_HOUSING,
    CLEAR_PAGE_QUARTERS,
    HOME_RESET_FILTER,
    CURRENT_ITEM_ID,
    HOME_MAP_SET_CITY,
    GET_SEO,
    GET_COUNT_ITEMS,
    LOADED_IMG
} from './constants';

import {API_ROOT} from '../../../helpers/constants';

// export const fetchHousing = (category = 'all') => async (dispatch, getState) => {
//     const {headerReducer, homeReducer} = getState();
//
//     const response = await axios.get(`${API_ROOT}/housing/frontend/${translate_language(headerReducer.language)}/${category}/${homeReducer.page}`);
//
//     dispatch({type: HOME_FETCH_HOUSING_SUCCESS, payload: response.data});
// };
// export const getCountItems = () => async (dispatch, getState) => {
//     const {headerReducer, homeReducer} = getState();
//
//     const response = await axios.get(`${API_ROOT}/housing/frontend/projects/${headerReducer.currentCategory}`);
//     dispatch({type: GET_COUNT_ITEMS, payload: response.data});
// };
// export const getCountItemsByFilter = () => async (dispatch, getState) => {
//     const {headerReducer, homeReducer} = getState();
//     dispatch({type: GET_COUNT_ITEMS, payload: homeReducer.data.length});
// };

// export const fetchHousingLoadMore = (category = 'all') => async (dispatch, getState) => {
//     const {headerReducer, homeReducer} = getState();
//
//     const response = await axios.get(`${API_ROOT}/housing/frontend/${translate_language(headerReducer.language)}/${category}/${homeReducer.page}`);
//
//     dispatch({type: HOME_LOAD_MORE, payload: response.data});
// };
export const getSeo = () => async (dispatch, getState) => {
    const {headerReducer, homeReducer} = getState();

    const response = await axios.get(`${API_ROOT}/seo/frontend/${headerReducer.language}/${headerReducer.currentCategory}`);
    dispatch({type: GET_SEO, payload: response.data.data});
};

export const fetchCoordinates = (category = 'all') => async (dispatch, getState) => {
    const {headerReducer, homeReducer} = getState();


    const response = await axios.get(`${API_ROOT}/housing/coordinate/google/map/view/${translate_language(headerReducer.language)}/${headerReducer.currentCityFromLocation}/${category}/${homeReducer.statusFilter}/${category === 'quarters' ? homeReducer.districtIdQuarters : homeReducer.districtId}`);

    dispatch({type: HOME_FETCH_HOUSING_GET_COORDINATES, payload: response.data});
};

export const fetchWelcome = () => async (dispatch, getState) => {
    const {headerReducer} = getState();

    const response = await axios.get(`${API_ROOT}/slider/filter/all/${translate_language(headerReducer.language)}`);

    dispatch({type: HOME_FETCH_HOUSING_GET_WELCOME, payload: response.data.data});

};

export const loadMore = () => ({
    type: HOME_FETCH_HOUSING_NEXT_PAGE
});
export const loadMoreQuarters = () => ({
    type: HOME_FETCH_HOUSING_NEXT_PAGE_QUARTETS
});

export const fetchItemByCity = (city) => async (dispatch, getState) => {
    const {headerReducer} = getState();

    const response = await axios.get(`${API_ROOT}/district/filter/${translate_language(headerReducer.language)}/${city}`);
    dispatch({type: HOME_FETCH_ITEMS_BY_CITY, payload: response.data.data});
};

export const fetchItemByFilter = ({city, district, status, page}) => async (dispatch, getState) => {
    const {headerReducer, homeReducer} = getState();
    const cityMatch = city || homeReducer.cityFilter;
    const districtMatch = district || homeReducer.districtId;
    const statusMatch = status || homeReducer.statusFilter;
    const pageMatch = page || homeReducer.page;
    const currentCategory = headerReducer.currentCategory;

    const response = await axios.get(`${API_ROOT}/housing/frontend/select/${translate_language(headerReducer.language)}/${cityMatch}/${districtMatch}/${statusMatch}/${currentCategory}/${pageMatch}/${isDevice()}`);

    dispatch({type: HOME_FETCH_ITEMS_BY_FILTER, payload: {...response.data}});
};
export const fetchItemByFilterQuarters = ({city, district, status, page}) => async (dispatch, getState) => {
    const {headerReducer, homeReducer} = getState();
    const cityMatch = city || homeReducer.cityFilterQuarters;
    const districtMatch = district || homeReducer.districtIdQuarters;
    const statusMatch = status || homeReducer.statusFilterQuarters;
    const pageMatch = page || homeReducer.pageQuarters;

    const response = await axios.get(`${API_ROOT}/section/frontend/select/${translate_language(headerReducer.language)}/${cityMatch}/${districtMatch}/${statusMatch}/${pageMatch}/${isDevice()}`);
    dispatch({type: HOME_FETCH_ITEMS_BY_FILTER_QUARTERS, payload: {...response.data}});
};
// export const fetchItemByFilterQuartersLoadMore = ({city, district, status, page}) => async (dispatch, getState) => {
//     const {headerReducer, homeReducer} = getState();
//
//     const cityMatch = city || homeReducer.cityFilterQuarters;
//     const districtMatch = district || homeReducer.districtIdQuarters;
//     const statusMatch = status || homeReducer.statusFilterQuarters;
//     const pageMatch = page || homeReducer.pageQuarters;
//
//
//     const response = await axios.get(`${API_ROOT}/section/frontend/select/${translate_language(headerReducer.language)}/${cityMatch}/${districtMatch}/${statusMatch}/${pageMatch}`);
//     dispatch({type: HOME_LOAD_MORE_QUARTERS, payload: response.data.data});
// };
export const fetchItemLoadMore = ({city, district, status, page}) => async (dispatch, getState) => {
    const {headerReducer, homeReducer} = getState();
    const cityMatch = city || homeReducer.cityFilter;
    const districtMatch = district || homeReducer.districtId;
    const statusMatch = status || homeReducer.statusFilter;
    const pageMatch = page || homeReducer.page;
    const currentCategory = headerReducer.currentCategory;

    const response = await axios.get(`${API_ROOT}/housing/frontend/select/${translate_language(headerReducer.language)}/${cityMatch}/${districtMatch}/${statusMatch}/${currentCategory}/${pageMatch}/${isDevice()}`);

    dispatch({type: HOME_LOAD_MORE, payload: {...response.data}});
};
// export const fetchItemLoadMoreQuarters = ({city, district, status, page}) => async (dispatch, getState) => {
//     const {headerReducer, homeReducer} = getState();
//
//     const cityMatch = city || homeReducer.cityFilterQuarters;
//     const districtMatch = district || homeReducer.districtIdQuarters;
//     const statusMatch = status || homeReducer.statusFilterQuarters;
//     const pageMatch = page || homeReducer.pageQuarters;
//
//     const response = await axios.get(`${API_ROOT}/section/frontend/select/${translate_language(headerReducer.language)}/${cityMatch}/${districtMatch}/${statusMatch}/${pageMatch}`);
//     dispatch({type: HOME_LOAD_MORE_QUARTERS, payload: response.data.data});
// };

export const getMapId = (id) => ({
    type: HOME_GET_MAP_ID,
    payload: id
});

export const setCity = (city) => ({
    type: HOME_SET_CITY,
    payload: city
});

export const setStatus = (status) => ({
    type: HOME_SET_STATUS,
    payload: status
});

export const setDistrictQuarters = (district) => ({
    type: HOME_SET_DISTRICT_QUARTERS,
    payload: district
});
export const setCityQuarters = (city) => ({
    type: HOME_SET_CITY_QUARTERS,
    payload: city
});

export const setStatusQuarters = (status) => ({
    type: HOME_SET_STATUS_QUARTERS,
    payload: status
});

export const setDistrict = (district) => ({
    type: HOME_SET_DISTRICT,
    payload: district
});

export const clearPageHousing = () => ({
    type: CLEAR_PAGE_HOUSING,
});

export const clearPageQuarters = () => ({
    type: CLEAR_PAGE_QUARTERS,
});

export const homeResetFilter = () => ({
    type: HOME_RESET_FILTER,
});

export const currentItemId = (id) => ({
    type: CURRENT_ITEM_ID,
    payload: id
});

export const setMapCity = city => ({
    type: HOME_MAP_SET_CITY,
    payload: city
});
export const loadedImg = () => ({
    type: LOADED_IMG,
    payload: true
});

// export const quartersFetchData = () => async (dispatch, getState) => {
//     const {headerReducer} = getState();
//
//     try {
//         const response = await axios.get(`${API_ROOT}/section/language/${translate_language(headerReducer.language)}`);
//         dispatch({type: QUARTERS_FETCH_DATA_REQUEST, payload: response.data.data});
//     } catch (e) {
//         dispatch({type: QUARTERS_FETCH_DATA_REQUEST, payload: {messageError: 'Что то пошло не так'}});
//     }
// };

