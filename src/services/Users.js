import * as axios from 'axios';
import { ActionCreators } from '../redux/UserReducer';

const axiosObj = axios.create({
    baseURL: "https://localhost:5001/Authenticator/",
});


export const Login = async (dispatch, loginData, errHandler)=>{
    try{         
        const {data} = await axiosObj.post("Login", loginData);        
        dispatch(ActionCreators.loginUser, data)
        console.log(data);
        errHandler("success");
    }
    catch(e){       
        console.log(e.response.data);
        errHandler(e.response.data);
    }
}