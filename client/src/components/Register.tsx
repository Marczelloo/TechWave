import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import md5 from 'md5';
import '../style/Login.css';

type Props = {}

function Register({}: Props) {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [registerInfoError, setRegisterInfoError] = useState<string | null>(null);
    const navigate = useNavigate();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    }
    
    const handleUsernameChange = (event: any) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if(!emailPattern.test(email))
        {
            setRegisterInfoError('Wrong or Invalid email address');
            return;
        }
        
        const hashedPassword = md5(password);

        const response = await fetch(`http://localhost:8080/register`,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password: hashedPassword, rememberMe}),
        });

        if(!response.ok)
        {
            throw new Error('Request failed');
        }

        const data = await response.json();

        console.log(data);

        if (data.success === 1)
        {
            navigate('/dashboard');
        }

        if(data.success === 0)
        {
            setRegisterInfoError(data.info);
        }

        console.log(email);
        console.log(username);
        console.log(password);
        console.log(hashedPassword);
        console.log(rememberMe);
    }

  return (
    <div className='wrapper'>
        <Navbar/>
        <div className='login-wrapper'>
            <form onSubmit={handleSubmit} className='login-container'>
                <h2> Create account </h2>
                <label> Email </label>
                <input 
                type='text' 
                name='login'
                value={email}
                onChange={handleEmailChange}/>
                <label> Username </label>
                <input
                type='text'
                name='username'
                value={username}
                onChange={handleUsernameChange}/>
                <label> Password </label>
                <input
                type='password' 
                name='password'
                value={password}
                onChange={handlePasswordChange}/>
                {
                    registerInfoError && <p className='login-info'> {registerInfoError} </p> 
                }
                <label className='custom-checkbox'>
                    <input
                        type='checkbox'
                        name='rememberMe'
                        onChange={handleRememberMeChange}
                    />
                    Keep me signed in?
                </label>
                
                <button type='submit'> Create account </button>
                <p className='new-to-techwave'> Already have account? </p>
                <Link to='../Login' className='register-link'> Sign in</Link>
            </form>
        </div>
    </div>
  )
}

export default Register