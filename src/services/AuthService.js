import APIClient from './APIClient';

var API = new APIClient();


export const AuthService = {
    Login: async (userData) => {
        return await API.post(`/v1/Customers/Auth`, userData);
    }
}