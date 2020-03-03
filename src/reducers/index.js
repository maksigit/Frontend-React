import { combineReducers } from 'redux';
import homeReducer from '../pages/home/services/reducer';
import footerReducer from '../modules/footer/services/reducer'
import headerReducer from '../modules/header/services/reducer';
import residentialSingleReducer from '../pages/residential-single/services/reducer';
import quartersGroupReducer from '../pages/quarters-single/services/reducer'
import kidsReducer from '../pages/kids/services/reducer'

const rootReducer = combineReducers({
  homeReducer,
  footerReducer,
  residentialSingleReducer,
  headerReducer,
  quartersGroupReducer,
  kidsReducer
});


export default rootReducer;
