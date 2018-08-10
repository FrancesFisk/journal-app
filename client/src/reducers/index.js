import { TEST_REDUCER } from './actions';

const initialState = {
    test: false
};

export function testReducer(state=initialState, action) {
    if (action.type === TEST_REDUCER) {
        return Object.assign({}, state, {
            test: true
        });
    }
    return state;
}