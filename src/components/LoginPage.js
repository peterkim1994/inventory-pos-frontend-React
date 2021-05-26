
import {useRef, useState} from 'react';
import * as axios from 'axios';


const axiosObj = axios.create({
    baseURL: "https://localhost:5001/Authenticator/",
});

export const LoginPage = () =>{

    const loginRef = useRef();
    const [name,setName] = useState();
    const [pass,setPassword] = useState();

    const login = async(event) =>{
        event.preventDefault();
        const loginData = {
            userName: name,
            password: pass
        }
        try{
            //const {data} = await axiosObj.post("authenticate",{});
            const {data} = await axiosObj.post("loging", loginData);
            console.log(data);
        }
        catch(e){
            console.log(e);
        }
    }

    return (
        <div >
            <form ref={loginRef} onSubmit={login} style={{display:"flex", margin:"auto", width:"30%", flexDirection:"column", padding:"50px", flexWrap:"wrap"}}>
                <label>User Name: </label>
                <input  name="userName" onChange={(event)=> setName(event.target.value)}/>
                <label>Password: </label>
                <input  name="password" onChange={(event)=> setPassword(event.target.value)}/>   
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage