import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: {
        "Content-Type" : "application/json"
    }
});


export const register = async (data) => {
    let response;
    try {
        response = await api.post('/register', data)
    } catch (error) {
        return error
    }
    return response;
    
};

export const login = async (data) => {
    let response;
    try {
        response = await api.post("/login", data)
    } catch (error) {
        return error
    }
    return response;
};

export const logout = async () => {
    let response;
    try {
        response = await api.post("/logout")
    } catch (error) {
        return error;       
    }
    return response;
};