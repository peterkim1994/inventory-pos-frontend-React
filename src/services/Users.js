import { ActionCreators } from '../redux/UserReducer';
import {axiosObj, checkToken} from './RequestServer';

export const Login = async (dispatch, loginData, errHandler)=>{
    try{
        const {data} = await axiosObj.post("Authenticator/Login", loginData);      
        const token = data.accessToken.split(",")[0];  
        localStorage.setItem("authority", token);
        checkToken();
        await dispatch(ActionCreators.loginUser(data));
        errHandler("success");       

    }
    catch(e){
        if(e.response && e.response.data){
            console.log(e.response.data);
            errHandler(e.response.data);
        }else{
            console.log(e);
        }
    }
}

export const Logout = async(dispatch) =>{
    try{
        checkToken();
        const {data} = await axiosObj.post("Authenticator/Logout");        
        dispatch(ActionCreators.logoutUser());
        localStorage.setItem("authority", " ");
    }
    catch(e){
        console.log(e);   
    }
}