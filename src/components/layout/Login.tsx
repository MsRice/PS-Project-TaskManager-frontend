import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuEyeClosed , LuEye } from "react-icons/lu";
import { useAuthentication } from '../../contexts/auth/AuthenticationContext';
// import { PiFingerprintDuotone } from "react-icons/pi";

const Login = () => {

    const [email , setEmail] = useState('')
    const [username , setUsername] = useState('')
    const [password , setPassword] = useState('')
    const [type , setType] = useState('password')

    const { login } = useAuthentication()
    const [error, setError] = useState<string | null>(null)

    const handleForm = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null)
        const userData = { email , username, password }

        try {
            console.log('NT',userData)
            await login(userData)
        } catch (error) {
            setError((error as Error).message)
        }
        
     
    }

      function togglePass(){
        setType(
            type === 'password' ? 'text' : 'password'
        ) 
    }
    return (
        <div className='login--containter'>
            <div className="login-form--wrapper">
                <form className="login-form" onSubmit={handleForm}>
                    <div className="input-wrapper input-username">
                        <input type="text" name="text" placeholder='Username:' value={username} onChange ={e => setUsername(e.target.value)}/>
                        
                    </div>
                    <div className="input-wrapper input-email">
                        <input type="text" name="email" placeholder='Email:' value={email} onChange ={e => setEmail(e.target.value)}/>
                        {/* <button
                            type="button"
                            className="passkey-btn log-icon in-dev"
                            title='Feature in Development'
                            disabled={!email}
                            aria-label="Sign in with Face ID or Touch ID"
                            onClick={() => loginWithPasskey(email)}
                            >
                            <PiFingerprintDuotone />
                        </button> */}
                    </div>

                    <div className="input-wrapper input-pass">
                        <input type={type} name="password" placeholder='Password:' value={password} onChange ={e => setPassword(e.target.value)}/>
                        <button 
                            type="button"
                            className='log-icon'
                            aria-label={type === 'password' ? 'Show password' : 'Hide password'} 
                            onClick={togglePass}>
                                {type === 'password' ? <LuEyeClosed /> :<LuEye /> }
                        </button>
                    </div>
                    { error && <p>Incorrect Username, Email or Password</p> }
                        
                    <button type="submit" className='btn'>Log In</button>
                </form>
                <div className='login-privacy--wrapper'>
                    <p className='login-privacy'>
                        By continuing, you agree to our 
                        Terms of Service and Privacy Policy.
                        Secure authentication powered by Firebase.
                    </p>

                <div className='login-register'>New to One Grain? <Link to={'login/:register'}> Create an Account</Link> </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
