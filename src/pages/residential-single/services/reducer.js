import {
  RESIDENTIAL_SINGLE_CAMERA_OPEN,
  RESIDENTIAL_SINGLE_CAMERA_CLOSE,
  RESIDENTIAL_SINGLE_FORM_OPEN,
  RESIDENTIAL_SINGLE_FORM_CLOSE,
    RESIDENTIAL_SINGLE_FETCH_DATA_SUCCESS,
    RESIDENTIAL_SINGLE_FETCH_DATA_ERROR,
    RESIDENTIAL_SINGLE_CLEAR_DATA
} from './constants';

const init = {
  cameraModal: false,
  formModal: false,
  data: null,
  messageError: null
};

const initialState = {
  ...init
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESIDENTIAL_SINGLE_CAMERA_OPEN: {
      return {
        ...state,
        cameraModal: true
      };
    }
    case RESIDENTIAL_SINGLE_CAMERA_CLOSE:
      return {
        ...state,
        cameraModal: false
      };
    case RESIDENTIAL_SINGLE_FORM_OPEN:
      return {
        ...state,
        formModal: true
      };
    case RESIDENTIAL_SINGLE_FORM_CLOSE:
      return {
        ...state,
        formModal: false
      };
    case RESIDENTIAL_SINGLE_FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case RESIDENTIAL_SINGLE_FETCH_DATA_ERROR:
      return {
        ...state,
        messageError: action.payload
      };
    case RESIDENTIAL_SINGLE_CLEAR_DATA:
      return {
        ...init
      };
    default: return state;
  }
};

