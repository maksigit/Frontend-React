import axios from 'axios';
import {
    KIDS_SINGLE_FETCH_DATA,
    KIDS_SINGLE_FETCH_DATA_ERROR
} from './constants';

import {API_ROOT} from '../../../helpers/constants';

// export const openCamera = () => ({
//     type: RESIDENTIAL_SINGLE_CAMERA_OPEN
// });
//
// export const closeCamera = () => ({
//     type: RESIDENTIAL_SINGLE_CAMERA_CLOSE
// });
//
// export const openForm = () => ({
//     type: RESIDENTIAL_SINGLE_FORM_OPEN
// });
//
// export const closeForm = () => ({
//     type: RESIDENTIAL_SINGLE_FORM_CLOSE
// });

export const kidsFetchData = ({language, id}) => async (dispatch, getState) => {
    const {headerReducer, homeReducer} = getState();

    try {
        const response = await axios.get(`${API_ROOT}/kids/frontend/${language}/${id}`);
        dispatch({type: KIDS_SINGLE_FETCH_DATA, payload: response.data.data});
    } catch (e) {
        dispatch({type: KIDS_SINGLE_FETCH_DATA_ERROR, payload: true});
    }


};


// export const clearData = () => ({
//     type: RESIDENTIAL_SINGLE_CLEAR_DATA
// });