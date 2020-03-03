import {
  HOME_FETCH_DATA_REQUEST,
  HOME_FETCH_DATA_SUCCESS,
  HOME_FETCH_DATA_ERROR
} from './constants';

const initialState = {
  data: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HOME_FETCH_DATA_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
    case HOME_FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case HOME_FETCH_DATA_ERROR:
      return {
        ...state,
        data: [],
        loading: false
      };
    default: return state;
  }
};

