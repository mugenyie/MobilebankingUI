import APIClient from './APIClient';

var API = new APIClient();


export const TransactionService = {
    Inititate: async (payload, headers) => {
        return await API.post(`/api/Transactions/Initiate`, payload, headers);
    },
    Confirm: async (payload, headers) => {
        return await API.post(`/api/Transactions/Confirm`, payload, headers);
    },
    History: async (accountNumber, headers) => {
        return await API.get(`/api/Transactions/History/${accountNumber}`,headers);
    }
}