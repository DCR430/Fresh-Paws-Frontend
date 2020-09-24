import * as types from '../actionTypes/groomers'

export function fetchGroomers() {
  return async dispatch => {
    dispatch({type: types.FETCH_GROOMERS});
    try {
      let response = await fetch('http://localhost:3000/groomers');
      if (response.status !== 200) {
        throw new Error('FETCH_ERROR');
      }
      response = await response.json();
      dispatch({type: types.FETCH_GROOMERS_SUCCESS, data: response});
    } catch (error) {
      dispatch({type: types.FETCH_GROOMERS_FAILURE, error});
    }
  };
}