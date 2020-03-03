import {FOOTER_FETCH_CONTACT_SUCCESS} from "../../footer/services/constants";
import {
    HEADER_CHANGE_LANGUAGE,
    HEADER_GET_NAME_ITEM_MENU,
    HEADER_GET_CURRENT_CATEGORY,
    SET_CURRENT_CITY_FROM_LOCATION,
    SET_CURRENT_INDEX_CATEGORIES
} from './constants';

const initialState = {
    tel: [],
    language: 'ru', // если они зайдут по ссылке то сделать action в componentDidMount с новый языком
    nameMenu: 'Жилые Комплексы',
    currentCategory: 'living_complex',
    currentCityFromLocation: 'odessa',
    currentIndexCategories: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case HEADER_CHANGE_LANGUAGE: {
            return {
                ...state,
                language: action.payload
            }
        }
        case FOOTER_FETCH_CONTACT_SUCCESS: {
            return {
                ...state,
                tel: action.payload
            }
        }
        case HEADER_GET_NAME_ITEM_MENU: {
            return {
                ...state,
                nameMenu: action.payload
            }
        }
        case HEADER_GET_CURRENT_CATEGORY: {
            return {
                ...state,
                currentCategory: action.payload
            }
        }
        case SET_CURRENT_CITY_FROM_LOCATION: {
            return {
                ...state,
                currentCityFromLocation: action.payload
            }
        }
        case SET_CURRENT_INDEX_CATEGORIES: {
            return {
                ...state,
                currentIndexCategories: action.payload
            }
        }
        default:
            return state;
    }
};
