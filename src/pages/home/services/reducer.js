import {
    HOME_FETCH_HOUSING_SUCCESS,
    HOME_FETCH_HOUSING_GET_COORDINATES,
    HOME_FETCH_HOUSING_GET_WELCOME,
    HOME_FETCH_HOUSING_NEXT_PAGE,
    HOME_FETCH_HOUSING_NEXT_PAGE_QUARTETS,
    HOME_GET_MAP_ID,
    HOME_FETCH_ITEMS_BY_CITY,
    QUARTERS_FETCH_DATA_REQUEST,
    HOME_SET_CITY,
    HOME_SET_STATUS,
    HOME_SET_DISTRICT,
    HOME_SET_CITY_QUARTERS,
    HOME_SET_STATUS_QUARTERS,
    HOME_SET_DISTRICT_QUARTERS,
    HOME_FETCH_ITEMS_BY_FILTER,
    HOME_FETCH_ITEMS_BY_FILTER_QUARTERS,
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

const initialState = {
    data: [],
    dataLength: 0,
    dataQuarters: [],
    dataComerce: [],
    dataBisness: [],
    dataToc: [],
    dataQuartersLength: 0,
    coordinates: [],
    welcome: [],
    page: 0,
    pageQuarters: 0,
    selectMap: '',
    districts: [],
    cityFilter: 'all',
    statusFilter: 'all',
    districtId: 'all',
    cityFilterQuarters: 'all',
    statusFilterQuarters: 'all',
    districtIdQuarters: 'all',
    currentItemId: "",
    mapInitCity: null,
    dataSeo: [],
    countItems: null,
    countItemsQuarters: null,
    loadedImgWelcome: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case HOME_FETCH_HOUSING_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                dataLength: action.payload.length
            };
        }
        case HOME_MAP_SET_CITY:
            return {
                ...state,
                mapInitCity: action.payload
            };
        case GET_COUNT_ITEMS:
            return {
                ...state,
                countItems: action.payload
            };
        case HOME_FETCH_HOUSING_GET_COORDINATES: {
            return {
                ...state,
                coordinates: [...action.payload.result]
            };
        }
        case GET_SEO: {
            return {
                ...state,
                dataSeo: action.payload
            };
        }
        case HOME_FETCH_HOUSING_GET_WELCOME:
            return {
                ...state,
                welcome: [...action.payload]
            };
        case HOME_FETCH_HOUSING_NEXT_PAGE:
            return {
                ...state,
                page: state.page + 1
            };
        case HOME_FETCH_HOUSING_NEXT_PAGE_QUARTETS:
            return {
                ...state,
                pageQuarters: state.pageQuarters + 1
            };
        case HOME_GET_MAP_ID:
            return {
                ...state,
                selectMap: action.payload
            };
        case HOME_FETCH_ITEMS_BY_CITY:
            return {
                ...state,
                districts: action.payload
            };
        case QUARTERS_FETCH_DATA_REQUEST:
            return {
                ...state,
                dataQuarters: action.payload
            };
        case HOME_SET_CITY:
            return {
                ...state,
                cityFilter: action.payload
            };
        case HOME_SET_STATUS:
            return {
                ...state,
                statusFilter: action.payload
            };
        case HOME_SET_DISTRICT:
            return {
                ...state,
                districtId: action.payload
            };
        case HOME_SET_CITY_QUARTERS:
            return {
                ...state,
                cityFilterQuarters: action.payload
            };
        case HOME_SET_STATUS_QUARTERS:
            return {
                ...state,
                statusFilterQuarters: action.payload
            };
        case HOME_SET_DISTRICT_QUARTERS:
            return {
                ...state,
                districtIdQuarters: action.payload
            };
        case HOME_FETCH_ITEMS_BY_FILTER:
            return {
                ...state,
                data: [...action.payload.data],
                countItems: action.payload.count,

            };
        case HOME_FETCH_ITEMS_BY_FILTER_QUARTERS:
            return {
                ...state,

                dataQuarters: [...state.dataQuarters, ...action.payload.data],
                countItemsQuarters: action.payload.count
            };
        case HOME_LOAD_MORE:
            return {
                ...state,
                data: [...state.data, ...action.payload.data],
                // dataLength: action.payload.length,
                countItems: action.payload.count
            };
        case HOME_LOAD_MORE_QUARTERS:
            return {
                ...state,
                dataQuarters: [...state.dataQuarters, ...action.payload],
                dataQuartersLength: action.payload.length
            };
        case CLEAR_PAGE_HOUSING:
            return {
                ...state,
                page: 0,
                data: [],
            };
        case CLEAR_PAGE_QUARTERS:
            return {
                ...state,
                dataQuarters: [],
                pageQuarters: 0
            };
        case CURRENT_ITEM_ID:
            return {
                ...state,
                currentItemId: action.payload
            };
        case LOADED_IMG:
            return {
                ...state,
                loadedImgWelcome: action.payload
            };
        case HOME_RESET_FILTER:
            return {
                ...state,
                cityFilter: 'all',
                statusFilter: 'all',
                districtId: 'all',
                cityFilterQuarters: 'all',
                statusFilterQuarters: 'all',
                districtIdQuarters: 'all'
            };

        default:
            return state;
    }
};

