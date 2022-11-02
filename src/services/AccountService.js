import APIClient from './APIClient';

var API = new APIClient();


export const AccountService = {
    GetDetails: async (accountNumber, headers) => {
        return await API.get(`/v1/Accounts/Details?accountNumber=${accountNumber}`, headers);
    }
}