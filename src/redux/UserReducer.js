const initialState = {
    user: null,
    storeId : 1
}

export const ActionTypes = {
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    GET_USER: "GET_USER",
    GET_STORE: "GET_STORE"
}

export const ActionCreators = {
    loginUser: payload => ({ type: ActionTypes.LOGIN_USER, payload }),
    logoutUser: payload => ({ type: ActionTypes.LOGOUT_USER, payload }),
    getUser: () => ({ type: ActionTypes.GET_USER }),
    getStore: () => ({type: ActionTypes.GET_STORE})
}

export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.LOGIN_USER:
            return {user: action.payload };
        case ActionTypes.LOGOUT_USER:
            return initialState;
        case ActionTypes.GET_USER:
            return state;
        case ActionTypes.GET_STORE:
            return state.storeId
        default:
            return initialState;
    }
}