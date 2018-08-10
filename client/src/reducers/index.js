import {
  FETCH_MAIN_SUCCESS
} from './actions';

const initialState = {
  main: []
};

export function selfCareReducer(state=initialState, action) {
  if (action.type === FETCH_MAIN_SUCCESS) {
      return Object.assign({}, state, {
          main: [...state.main, action.main]
      });
  }
  
  return state;
}