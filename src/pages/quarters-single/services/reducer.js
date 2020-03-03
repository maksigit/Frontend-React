import {
  QUARTERS_SINGLE_FETCH_DATA_REQUEST,
  QUARTERS_SINGLE_FETCH_DATA_ERROR
} from './constants';

const init = {
  // cameraModal: false,
  // formModal: false,
  // data: null,
  messageErrorQuarters: null,
  section: null,
  complex: []
};

const initialState = {
  ...init
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case RESIDENTIAL_SINGLE_CAMERA_OPEN: {
    //   return {
    //     ...state,
    //     cameraModal: true
    //   };
    // }
    // case RESIDENTIAL_SINGLE_CAMERA_CLOSE:
    //   return {
    //     ...state,
    //     cameraModal: false
    //   };
    // case RESIDENTIAL_SINGLE_FORM_OPEN:
    //   return {
    //     ...state,
    //     formModal: true
    //   };
    // case RESIDENTIAL_SINGLE_FORM_CLOSE:
    //   return {
    //     ...state,
    //     formModal: false
    //   };
    // case RESIDENTIAL_SINGLE_FETCH_DATA_SUCCESS:
    //   return {
    //     ...state,
    //     data: action.payload
    //   };
    case QUARTERS_SINGLE_FETCH_DATA_ERROR:
      return {
        ...state,
        messageErrorQuarters: action.payload
      };
    // case RESIDENTIAL_SINGLE_CLEAR_DATA:
    //   return {
    //     ...init
    //   };
    case QUARTERS_SINGLE_FETCH_DATA_REQUEST:
      return {
        ...init,
        section: action.payload.section,
        complex: action.payload.complex
      };
    default: return state;
  }
};

