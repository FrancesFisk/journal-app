import {SET_PRINCIPAL, SET_INTEREST, SET_YEARS} from './actions';

const initialState = {
    principal: 10000,
    interest: 3,
    years: 5
};

export const testReducer = (state=initialState, action) => {
    if (action.type === SET_PRINCIPAL) {
        return Object.assign({}, state, {
            principal: action.principal
        });
    }
    else if (action.type === SET_INTEREST) {
        return Object.assign({}, state, {
            interest: action.interest
        });
    }
    else if (action.type === SET_YEARS) {
        return Object.assign({}, state, {
            years: action.years
        });
    }
    return state;
};

