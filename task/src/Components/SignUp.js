import React, { useEffect, useState } from "react";
import '../Styles/FormStyle.css';
import { validate } from '../Utilities/FormUtils.js'
import { getAllCountries, getAllStates, onSignUp } from "../Services/loginService.js";

function SignUp({ onToggleLogin }) {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [usernameError, setUsernameError] = useState('');
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        state: "",
        country: "",
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    useEffect (() => {
        getAllCountries().then((response) => {
            setCountries(response.data || []);
            userData.state = "";
        })
            .catch((error) => {
                console.log("Error occured", error)
            });
    }, []);

    const getStates = (e) => {
        getAllStates(userData.country).then((response) => {
            setStates(response.data || []);
        })
        .catch((error) => {
            if (error.response && error.response.data) {
                console.log("Error occured", error)
            }
        });
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        const requiredFields = ['username', 'password', 'firstName', 'lastName', 'email', 'phoneNumber', 'state', 'country'];
        const isValid = validate(userData, requiredFields, setErrors);
        if (isValid) {
            onSignUp(userData).then(() => {
                onToggleLogin();
            })
            .catch((error) => {
                if (error.response.data.message) {
                    setUsernameError("Username Already Exists!");
                }
            });
        }
    };

    return (
        <div className="signup-container d-flex justify-content-center align-items-center">
            <div className="card shadow-sm p-4">
                <form className="form"
                    onSubmit={handleSignUp}>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="mb-3">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" value={userData.username} onChange={handleInputChange}
                                    className={`form-control ${errors.username ? "is-invalid" : ""}`} 
                                    placeholder="Enter username"/>
                                {errors.username && (
                                    <div className="text-danger">*Username is required</div>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="mb-3">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" value={userData.password} onChange={handleInputChange}
                                    className={`form-control ${errors.password ? "is-invalid" : ""}`} placeholder="Enter password"/>
                                {errors.password && (
                                    <div className="text-danger">*Password is required</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="mb-3">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" id="firstName" value={userData.firstName} onChange={handleInputChange}
                                    className={`form-control ${errors.firstName ? "is-invalid" : ""}`} placeholder="Enter first name"/>
                                {errors.firstName && (
                                    <div className="text-danger">*First Name is required</div>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="mb-3">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" id="lastName" value={userData.lastName} onChange={handleInputChange}
                                    className={`form-control ${errors.lastName ? "is-invalid" : ""}`} placeholder="Enter last name"/>
                                {errors.lastName && (
                                    <div className="text-danger">*Last Name is required</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="mb-3">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input type="tel" id="phoneNumber" value={userData.phoneNumber} onChange={handleInputChange}
                                    className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`} placeholder="Enter phone number"/>
                                {errors.phoneNumber && (
                                    <div className="text-danger">{errors.phoneNumber}</div>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="mb-3">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" value={userData.email} onChange={handleInputChange}
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`} placeholder="Enter email"/>
                                {errors.email && (
                                    <div className="text-danger">*Email is required</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="mb-3">
                                <label htmlFor="country">Country</label>
                                <select id="country" value={userData.country}
                                    className={`form-control ${errors.country ? "is-invalid" : ""}`}
                                    onChange={handleInputChange} >
                                    <option value="">Select a country</option>
                                    {countries.map((country) => (
                                        <option key={country.countryCode} value={country.countryCode}>
                                            {country.countryName}
                                        </option>
                                    ))}
                                </select>
                                {errors.country && (
                                    <div className="text-danger">*Country is required</div>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="mb-3">
                                <label htmlFor="state">State</label>
                                <select id="state" value={userData.state} onClick={getStates}
                                    className={`form-control ${errors.state ? "is-invalid" : ""}`}
                                    onChange={handleInputChange} disabled={!userData.country} >
                                    <option value="">Select a state</option>
                                    {states.map((state) => (
                                        <option key={state.stateCode} value={state.stateCode}>
                                            {state.stateName}
                                        </option>
                                    ))}
                                </select>
                                {errors.state && (
                                    <div className="text-danger">*State is required</div>
                                )}
                            </div>
                        </div>
                        {usernameError && (
                            <div className="text-danger">{usernameError}</div>
                        )}
                    </div>
                    <div className="d-flex flex-column align-items-center mb-2">
                        <button type="submit" className="btn btn-primary w-100">
                            Sign Up
                        </button>
                        <div className="mt-3">
                            Are you an existing user?{" "}
                            <a className="text-primary pointer" href="/">
                                Login
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default SignUp;
