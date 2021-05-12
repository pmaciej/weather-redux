import {WEATHER_API_KEY, BASE_URL} from '../../helpers/keys';
import axios from 'axios';
import {GET_LOCATION_FROM_COORDS, GET_LOCATIONLIST_FROM_INPUT, GET_WEATHER_FROM_COORDS,SET_ERROR,SET_LOADING} from '../types'


export const getWeatherFromCoords = (lat, lon) => {
  return async dispatch => {
    try {
      const url = `${BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${WEATHER_API_KEY}`;
      const request = axios.get(url);
      const response = await request;

      if(!response) {
        const resData = await response;
        throw new Error(resData.data.error);
      }

      dispatch({
        type: GET_WEATHER_FROM_COORDS,
        payload: response.data.daily
      });
    }catch(err) {
      dispatch({
        type: SET_ERROR,
        payload: err.message
      });
    }
  }
}

export const getLocationFromCoords = (lat, lon) => {
  return async dispatch => {
    try {
      const url = `${BASE_URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${WEATHER_API_KEY}`;
      const request = axios.get(url);
      const response = await request;

      if(!response) {
        const resData = await response;
        throw new Error(resData.data.error);
      }

      dispatch({
        type: GET_LOCATION_FROM_COORDS,
        payload: response.data[0]
      });
    }catch(err) {
      dispatch({
        type: SET_ERROR,
        payload: 'Could not connect to open weather api'
      });
    }
  }
}

export const getLocationListFromInput = (input) => {
  return async dispatch => {
    try {
      const url = `${BASE_URL}/geo/1.0/direct?q=${input}&limit=5&appid=${WEATHER_API_KEY}`;
      const request = axios.get(url);
      const response = await request;

      if(!response) {
        const resData = await response;
        throw new Error(resData.data.error);
      }

      dispatch({
        type: GET_LOCATIONLIST_FROM_INPUT,
        payload: response.data
      });
    }catch(err) {
      dispatch({
        type: SET_ERROR,
        payload: "Could not find location"
      });
    }
  }
}

export const setLoading = () => {
  return {
    type: SET_LOADING
  }
}

export const setError = () => {
  return {
    type: SET_ERROR,
    payload: ''
  }
}



