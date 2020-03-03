import axios from 'axios';
import {
    RESIDENTIAL_SINGLE_CAMERA_OPEN,
    RESIDENTIAL_SINGLE_CAMERA_CLOSE,
    RESIDENTIAL_SINGLE_FORM_OPEN,
    RESIDENTIAL_SINGLE_FORM_CLOSE,
    RESIDENTIAL_SINGLE_FETCH_DATA_SUCCESS,
    RESIDENTIAL_SINGLE_FETCH_DATA_ERROR,
    RESIDENTIAL_SINGLE_CLEAR_DATA
} from './constants';

import {API_ROOT} from '../../../helpers/constants';

export const openCamera = () => ({
    type: RESIDENTIAL_SINGLE_CAMERA_OPEN
});

export const closeCamera = () => ({
    type: RESIDENTIAL_SINGLE_CAMERA_CLOSE
});

export const openForm = () => ({
    type: RESIDENTIAL_SINGLE_FORM_OPEN
});

export const closeForm = () => ({
    type: RESIDENTIAL_SINGLE_FORM_CLOSE
});

export const singleFetchData = ({id, language}) => async (dispatch, getState) => {
    const {headerReducer, homeReducer} = getState();

    try {
        const response = await axios.get(`${API_ROOT}/housing/single/${language}/${id}`);
        dispatch({type: RESIDENTIAL_SINGLE_FETCH_DATA_SUCCESS, payload: response.data});
    } catch (e) {
        dispatch({type: RESIDENTIAL_SINGLE_FETCH_DATA_ERROR, payload: true});
    }
};


export const clearData = () => ({
    type: RESIDENTIAL_SINGLE_CLEAR_DATA
});