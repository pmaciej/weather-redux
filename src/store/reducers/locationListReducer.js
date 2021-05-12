import { GET_LOCATIONLIST_FROM_INPUT, SET_LOADING, SET_ERROR } from "../types";

const initialState = {
  data: null,
  loading: false,
  error: ''
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_LOCATIONLIST_FROM_INPUT:
      return {
        data: action.payload,
        loading: false,
        error: ''
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case SET_ERROR: 
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default: 
      return state;
  }
}