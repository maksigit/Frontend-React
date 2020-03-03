import axios from 'axios';
import {
    QUARTERS_SINGLE_FETCH_DATA_REQUEST,
    QUARTERS_SINGLE_FETCH_DATA_ERROR
} from './constants';

import {API_ROOT} from '../../../helpers/constants';

export const quartersFetchData = ({id, language}) => async (dispatch, getState) => {

    try {
        const response = await axios.get(`${API_ROOT}/section/complex/list/${language}/${id}`);
        dispatch({type: QUARTERS_SINGLE_FETCH_DATA_REQUEST, payload: response.data.data});
    } catch (e) {
        dispatch({type: QUARTERS_SINGLE_FETCH_DATA_ERROR, payload: true});
    }
};