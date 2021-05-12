import { SET_ALERT} from '../types';

export const setAlert = (message)=> {
  return {
    type: SET_ALERT,
    payload: message
  }
}