import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';

const Login = ({ handleLogin }) => {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigate = useNavigate();

    const [login, { loading: loginLoading, error: loginError }] = useMutation(LOGIN, {
        onError: (error) => {
            console.error('Login error: ', error);
        },
        onCompleted: (data) => {
            console.log('Login success: ', data);
            localStorage.setItem('token', data.login.token);
            handleLogin();
            navigate('/home');
        },
    });

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ variables: { username: loginUsername, password: loginPassword } });
        } catch (error) {
            console.error('Error logging in: ', error);
        }
    };

    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="col-8">
                        <div className="d-flex justify-content-center">
                            <div className="login-form">
                                <h2 className="login-title text-center mt-3">
                                    Login
                                </h2>
                                <form className="d-flex flex-column" onSubmit={handleLoginSubmit}>
                                    <input type="text" className="input-field" placeholder="Username"  value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)}  />
                                    <input type="password" className="login-form" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                                    <div className="d-flex justify-content-end">
                                        <button className='submit-button btn btn-dark w-25' type="submit" disabled={loginLoading} >Login</button>
                                    </div>
                                </form>
                                {loginError && <p className='error-message'>Error: {loginError.message} </p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Login;