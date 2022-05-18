export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const setUser = payload  => ({
    type: SET_USER,
    payload,
})

export const removeUser = ()  => ({
    type: REMOVE_USER,
})