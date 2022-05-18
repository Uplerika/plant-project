import { SET_USER, REMOVE_USER } from "../actions/auth";

const initialState = {
    email: null,
    token: null,
    id: null,
};

const authReducer = (state = initialState, action) => { 
    switch (action.type) {
        case SET_USER: {
            return { 
                email: action.payload.email,
                token: action.payload.token,
                id: action.payload.id,
            }
        }
        case REMOVE_USER: {
            return {
                //...state, 
                email: null,
                token: null,
                id: null,
            }
        }
    default:
        return state;
    }
};

export default authReducer;