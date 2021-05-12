import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import weatherReducer from './reducers/weatherReducer';
import alertReducer from './reducers/alertReducer';
import locationReducer from './reducers/locationReducer';
import locationListReducer from './reducers/locationListReducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
  location: locationReducer,
  locationList: locationListReducer,
  alert: alertReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);


export default store;