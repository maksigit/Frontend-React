import {FOOTER_FETCH_CONTACT_SUCCESS, FOOTER_FETCH_SOCIAL_ICON} from "./constants";
import axios from 'axios';
import {API_ROOT} from '../../../helpers/constants';

export const fetchPhone = city => async dispatch => {
    const response = await axios.get(`${API_ROOT}/city/${city}`);
    dispatch({type: FOOTER_FETCH_CONTACT_SUCCESS, payload: response.data})
};
export const fetchSocialIcon = () => async dispatch => {
    const response = await axios.get(`${API_ROOT}/social/5def557c9533cf110c30f714`);
    dispatch({type: FOOTER_FETCH_SOCIAL_ICON, payload: response.data.icons})
};