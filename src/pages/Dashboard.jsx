import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader';
import PageTitle from '../components/PageTitle'
import { useAuthContext } from '../contexts/AuthContext';
import { AccountService } from '../services/AccountService';

function Dashboard() {
    const {getSessionData, accountNumber, setAccountNumber} = useAuthContext();
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [accountDetails, setAccountDetails] = useState(null);

    useEffect(() => {
        console.log(accountNumber)
        if(accountNumber === null) {
            setAccountNumber(getSessionData()?.user?.accounts[0].accountNumber)
        }else{
            let headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "x-api-key": process.env.REACT_APP_APIKEY,
                "user-id": getSessionData()?.user.customerId,
                "Authorization": `Bearer ${getSessionData()?.token}`
                };
            AccountService.GetDetails(accountNumber, headers)
            .then(data => {
                if(data.statusCode===200){
                    console.log(data.body);
                    setAccountDetails(data.body)
                }
                else{
                    setError(data.body);
                    setLoading(false);
                }
            }).catch(err => {
                console.log(err);
                setLoading(false);
                setError(err)
            });
        }
    },[accountNumber])

  return (
    <div>
        <PageTitle text={'Home'} />
        <div className='mt-8 flex flex-col items-center justify-center gap-2 border-b border-gray-300 pb-4'>
            <span>{accountDetails?.name} (Acc No. {accountDetails?.accountNumber})</span>
        <span>Balance:</span>
            <div className=''>
                <span className='font-semibold text-lg mr-2'>UGX</span>
                {loading && <Loader />}
                {!loading && accountDetails && <span className='font-semibold text-3xl'>{accountDetails?.newBalance?.toLocaleString("en-US")}</span>}
            </div>
        </div>

        <div className='flex flex-row justify-between mt-8'>
            <div className='font-bold text-lg text-gray-800 capitalize border border-gray-200 rounded p-4'>
                <Link to={'transaction'}>Initiate Transfer</Link>
            </div>
            <div className='font-bold text-lg text-gray-800 capitalize border border-gray-200 rounded p-4'>
            <Link to={'/history'}>Transactions History</Link>
            </div>
        </div>

        <span className='flex items-center justify-center mt-48'>X Capital Bank All Rights Reserved (c) 2022</span>
    </div>
  )
}

export default Dashboard