import APIClient from './APIClient';

var API = new APIClient();


export const TransactionService = {
    Inititate: async (payload) => {
        return await API.post(`/api/Transactions/Initiate`, payload);
    },
    Confirm: async (payload) => {
        return await API.post(`/api/Transactions/Confirm`, payload);
    },
    History: async (accountNumber) => {
        return await API.get(`/api/Transactions/History/${accountNumber}`);
    }
}