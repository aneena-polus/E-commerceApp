import React, { useContext, useEffect, useState } from 'react';
import SignUp from './SignUp';
import { Link, useNavigate } from 'react-router-dom';
import { validate } from '../Utilities/FormUtils.js'
import { onLogin } from '../Services/loginService.js';
import { AuthContext } from '../Context/AuthContext.js';
import '../Styles/FormStyle.css';
import { ToastMessage } from '../Common/Toast.js';

function Login() {
    const [isLoginPage, setIsLoginPage] = useState(true);
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState('');
    const { userData, setUserData } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setUserData({ username: '', password: '' });
    }, [setUserData]);

    const toggleSignUpPage = () => {
        setIsLoginPage((isLoggedIn) => !isLoggedIn);
        setUserData({ username: '', password: '' })
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const requiredFields = ['username', 'password'];
        const isValid = validate(userData, requiredFields, setErrors);
        if (isValid) {
            onLogin(userData).then((response) => {
                localStorage.setItem('userData', JSON.stringify(response.data));
                setUserData(response.data);
                navigate('/shop');
                ToastMessage(`Welcome ${JSON.parse(localStorage.getItem('userData')).username}`);
            })
            .catch((error) => {
                console.error("Error during login:", error);
                setLoginError(error.response.data);
            });
        }
    };

    return (
        <>
            {isLoginPage ?
                <div className="signup-container container d-flex justify-content-center align-items-center">
                    <div className="card shadow-sm p-4">
                        <h2 className="text-center mb-4">Login</h2>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                    id="username" onChange={handleInputChange} placeholder="Enter username"
                                />
                                {errors.username && <div className="text-danger">*Username is required</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                    id="password" onChange={handleInputChange} placeholder="Enter password"
                                />
                                {errors.password && <div className="text-danger">*Password is required</div>}
                                {loginError && <div className="text-danger">{loginError}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                        <div className="mt-3">
                            Don't have an account? <Link href="#" underline="always" onClick={toggleSignUpPage}>
                                 Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
                :
                <SignUp onToggleLogin={toggleSignUpPage} />
            }
        </>
    );
}

export default Login;
