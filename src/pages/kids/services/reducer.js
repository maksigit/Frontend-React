import {
  // RESIDENTIAL_SINGLE_CAMERA_OPEN,
  // RESIDENTIAL_SINGLE_CAMERA_CLOSE,
  // RESIDENTIAL_SINGLE_FORM_OPEN,
  // RESIDENTIAL_SINGLE_FORM_CLOSE,
  //   RESIDENTIAL_SINGLE_FETCH_DATA_SUCCESS,
  //   RESIDENTIAL_SINGLE_FETCH_DATA_ERROR,
  //   RESIDENTIAL_SINGLE_CLEAR_DATA
    KIDS_SINGLE_FETCH_DATA,
  KIDS_SINGLE_FETCH_DATA_ERROR
} from './constants';

const init = {
  // cameraModal: false,
  // formModal: false,
  kidsData: null,
  messageErrorKids: null
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
    case KIDS_SINGLE_FETCH_DATA_ERROR:
      return {
        ...state,
        messageErrorKids: action.payload
      };
    // case RESIDENTIAL_SINGLE_CLEAR_DATA:
    //   return {
    //     ...init
    //   };
      case KIDS_SINGLE_FETCH_DATA:
        return {
          ...state,
          kidsData: action.payload
        };

    default: return state;
  }
};

