import { useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import {Login, Logout} from '../services/Users';

export const LoginPage = () =>{

    const loginRef = useRef();
    const [name,setName] = useState();
    const [pass,setPassword] = useState();
    const dispatch = useDispatch();
    const [response, setResponse ] = useState("");

    const login = (event) =>{
        event.preventDefault();      
        const loginData = {
            userName: name,
            password: pass
        }
        Login(dispatch, loginData, setResponse);
    }

    const logOut = (event)=>{
        event.preventDefault();
        Logout(dispatch);
    }

    return (
        <div >
            <form ref={loginRef} onSubmit={login} style={{display:"flex", margin:"auto", width:"30%", flexDirection:"column", padding:"50px", flexWrap:"wrap"}}>
                <label>User Name: </label>
                <input  name="userName" onChange={(event)=> setName(event.target.value)}/>
                <label>Password: </label>
                <input type="password" name="password" onChange={(event)=> setPassword(event.target.value)}/>   
                <br/>
                <button className="btn btn-primary" type="submit">Login</button>
                <button className="btn btn-warning" onClick={(event) =>logOut(event)}>Logout</button>
            </form>
            {response}
        </div>
    )
}

export default LoginPage