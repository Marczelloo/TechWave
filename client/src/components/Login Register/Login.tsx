import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";
import md5 from 'md5';
import '../../style/Login Register/Login.css';

import show_password_img from '../../assets/show.png';
import hide_password_img from '../../assets/hide.png';


type Props = {}

function Login({}: Props) {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [loginInfoError, setLoginInfoError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleLoginChange = (event: any) => {
        setLogin(event.target.value);
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const hashedPassword = md5(password);

        const response = await fetch(`http://localhost:8080/login`,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password: hashedPassword, rememberMe}),
        });

        if(!response.ok)
        {
            throw new Error('Request failed');
        }

        const data = await response.json();

        if (data.success === 1)
        {
            navigate('/dashboard');
        }
        else if(data.success === 0)
        {
            setLoginInfoError(data.info);
        }
    }

    const changePasswordVisibility = (e: any) => {
        e.preventDefault();
    
        setShowPassword(!showPassword);
      };

  return (
    <div className='wrapper'>
        <Navbar/>
        <div className='login-wrapper'>
            <form onSubmit={handleSubmit} className='login-container'>
                <h2> Sign in </h2>
                <label> Email or login </label>
                <input 
                type='text' 
                name='login'
                value={login}
                onChange={handleLoginChange}/>
                <label> Password </label>
                <div className='login-password-input'>
                    <input
                    type={showPassword ? 'text' : 'password'} 
                    name='password'
                    value={password}
                    onChange={handlePasswordChange}/>
                    <button className='dashboard-password-button' onClick={(e) => changePasswordVisibility(e)}> { showPassword ? <img src={show_password_img} alt="show password img"/> : <img src={hide_password_img} alt="hide password img" />}</button>
                </div>
                {/* <input
                type={showPassword ? 'text' : 'password'} 
                name='password'
                value={password}
                onChange={handlePasswordChange}/>
                <button className='dashboard-password-button' onClick={(e) => changePasswordVisibility(e)}> { showPassword ? <img src={show_password_img} alt="show password img"/> : <img src={hide_password_img} alt="hide password img" />}</button> */}
                {
                    loginInfoError && <p className='login-info'> {loginInfoError} </p> 
                }
                <label className='custom-checkbox'>
                    <input
                        type='checkbox'
                        name='rememberMe'
                        onChange={handleRememberMeChange}
                    />
                    Keep me signed in?
                </label>
                
                <button type='submit'> Sign in </button>
                <p className='new-to-techwave'> New to TechWave? </p>
                <Link to='../Register' className='register-link'> Create TechWave Account</Link>
            </form>
        </div>
    </div>
  )
}

export default Login