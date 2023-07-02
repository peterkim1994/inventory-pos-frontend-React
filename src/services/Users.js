import { ActionCreators } from '../redux/UserReducer';
import {axiosObj, checkToken} from './RequestServer';

export const Login = async (dispatch, loginData, errHandler)=>{
    try{               
        const headers = {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",                
              'Content-Type':  'application/json'   
          };
        const {data} = await axiosObj.post("Authenticator/Login", loginData,{headers});      
        const token = data.accessToken.split(",")[0];  
    
        localStorage.setItem("authority", token);
        checkToken();
        await dispatch(ActionCreators.loginUser(data));
     //   let prevState = localStorage.getItem("superAdminLogedOn");
        localStorage.setItem("superAdminLogedOn", true);
        
       // let autoLogOut = (prevState) =>{
       //     if(!prevState){
                setTimeout(()=> localStorage.setItem("superAdminLogedOn", false), 2000000);
       //     }
      //  }
        
      //  autoLogOut(prevState);
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
        localStorage.setItem("authority", " ");
        localStorage.setItem("superAdminLogedOn", false);
        checkToken();
   //     const {data} = await axiosObj.post("Authenticator/Logout");        
        dispatch(ActionCreators.logoutUser());
    }
    catch(e){
        console.log(e);   
    }
}