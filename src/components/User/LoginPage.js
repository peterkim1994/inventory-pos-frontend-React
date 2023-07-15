import { useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { Login, Logout } from '../../services/Users';
import '../../assets/User.scss';

export const LoginPage = () => {

    const loginRef = useRef();
    const [name, setName] = useState();
    const [pass, setPassword] = useState();
    const dispatch = useDispatch();
    const [response, setResponse] = useState("");

    const login = (event) => {
        event.preventDefault();
        const loginData = {
            userName: name,
            password: pass
        }

        Login(dispatch, loginData, setResponse);
    }

    const logOut = (event) => {
        event.preventDefault();
        Logout(dispatch);
    }
            //style={{ display: "flex", margin: "auto", width: "30%", flexDirection: "column", padding: "50px", flexWrap: "wrap" }}
    return (
        <div className='main-view-panel'>
            <div className="login-screen">
                <form ref={loginRef} onSubmit={login}>
                    <div className='std-form-control'>
                        <label>User Name </label>
                        <input name="userName" onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className='std-form-control'>
                        <label>Password </label>
                        <input type="password" name="password" onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div className="login-options"> 
                        <button className="btn btn-primary" type="submit">Login</button>
                        <button className="btn btn-warning" onClick={(event) => logOut(event)}>Logout</button>
                    </div>
                </form>
                {response}
            </div>
        </div>
    )
}

export default LoginPage