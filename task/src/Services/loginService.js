import axios from 'axios';

export const getAllCountries = () => {
    return axios.get("/api/countries");
};

export const getAllStates = (countryCode) => {
    return axios.get(`/api/states/${countryCode}`);
};

export const onLogin = (userData) => {
    return axios.post("/api/login",userData);
};

export const onSignUp = (userData) => {
    return axios.post("/api/signup",userData);
};

