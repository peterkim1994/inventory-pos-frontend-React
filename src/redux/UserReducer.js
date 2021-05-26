initialState = {
    user : {}
}

export const ActionTypes = {
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
}

export const ActionCreators = {
    loginUser : payload => { ActionTypes.LOGIN_USER, payload },
    logoutUser : payload => { ActionTypes.LOGOUT_USER, payload },
 
}

export default UserReducer = (state=initialState, action) =>{
    switch(action.ActionTypes){
        case ActionTypes.LOGIN_USER: 
            return {...state, user: action.payload}
        case ActionTypes.LOGOUT_USER:
            return initialState;
        default:
            return initialState;       
    }
}

