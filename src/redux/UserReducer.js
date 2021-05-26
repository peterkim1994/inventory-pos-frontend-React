const initialState = {
    user : {}
}

export const ActionTypes = {
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
}

export const ActionCreators = {
    loginUser : payload => ({type: ActionTypes.LOGIN_USER, payload }),
    logoutUser : payload => ({type: ActionTypes.LOGOUT_USER, payload }),
 
}

export default function UserReducer(state = initialState, action){
    switch(action.ActionTypes){
        case ActionTypes.LOGIN_USER: 
            return {...state, user: action.payload}
        case ActionTypes.LOGOUT_USER:
            return initialState;
        default:
            return initialState;       
    }
}

