import {FOOTER_FETCH_CONTACT_SUCCESS} from "../../footer/services/constants";
import {HEADER_CHANGE_LANGUAGE,
    HEADER_GET_NAME_ITEM_MENU,
    HEADER_GET_CURRENT_CATEGORY,
    SET_CURRENT_CITY_FROM_LOCATION,
    SET_CURRENT_INDEX_CATEGORIES
} from './constants';
import axios from 'axios';
import {API_ROOT} from '../../../helpers/constants';

export const fetchPhone = city => async dispatch => {
    const response = await axios.get(`${API_ROOT}/city/${city}`);
    dispatch({type: FOOTER_FETCH_CONTACT_SUCCESS, payload: response.data})
};

export const changeLanguage = language => ({
    type: HEADER_CHANGE_LANGUAGE,
    payload: language
});

export const getNameItemMenu = (name) => ({
    type: HEADER_GET_NAME_ITEM_MENU,
    payload: name
});

export const getCurrentCategory = (name) => ({
    type: HEADER_GET_CURRENT_CATEGORY,
    payload: name
});

export const setCurrentCityFromLocation = (city) => ({
    type: SET_CURRENT_CITY_FROM_LOCATION,
    payload: city
});

export const setCurrentIndexCategories = (index) => ({
    type: SET_CURRENT_INDEX_CATEGORIES,
    payload: index
});