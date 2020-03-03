import api from '../../../middleware/api';
import {
  HOME_FETCH_DATA_SUCCESS
} from './constants';

export const fetchData = () => async dispatch => {
  const response = await api.get('posts');
  dispatch({ type: HOME_FETCH_DATA_SUCCESS, payload: response.data });
};
