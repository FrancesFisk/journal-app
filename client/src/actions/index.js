import {API_BASE_URL} from '../config';

export const FETCH_MAIN_SUCCESS = 'FETCH_MAIN_SUCCESS';
export const fetchMainSuccess = main => ({
    type: FETCH_MAIN_SUCCESS,
    main
});

export const fetchMain = () => dispatch => {
    fetch(`${API_BASE_URL}/main`)
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        })
        .then(main => {
            dispatch(fetchMainSuccess(main));
        });
};