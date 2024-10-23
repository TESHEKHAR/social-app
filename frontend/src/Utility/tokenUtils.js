import {jwtDecode} from 'jwt-decode';

const TOKEN_KEY = 'Token';
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};
export const decodeToken = (token) => {
    if (!token) return null;

    try {
        return jwtDecode(token);
    } catch (error) {
        console.error("Failed to decode token", error);
        return null;
    }
};
export const isTokenExpired = (token) => {
    const decoded = decodeToken(token);
    if (!decoded) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
};
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};
export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};
