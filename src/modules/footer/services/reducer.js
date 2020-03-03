import {FOOTER_FETCH_CONTACT_SUCCESS, FOOTER_FETCH_SOCIAL_ICON} from "./constants";

const initialState = {
    tel: [],
    icon: []
};

 const footerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOOTER_FETCH_CONTACT_SUCCESS: {
            return {
                ...state,
                tel: action.payload
            }
        }
        case FOOTER_FETCH_SOCIAL_ICON: {
            return {
                ...state,
                icon: action.payload
            }
        }
        default: return state;
    }
};

export default footerReducer;