import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ButtonAction from '../components/ButtonAction'
import ErrorAlert from '../components/ErrorAlert'
import Input from '../components/Input'
import Loader from '../components/Loader'
import PageTitle from '../components/PageTitle'
import TextArea from '../components/TextArea'
import { useAuthContext } from '../contexts/AuthContext'
import { TransactionService } from '../services/TransactionService'

function Transaction() {
    const {getSessionData, accountNumber} = useAuthContext();
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({});
    const [transactionData, setTransactionData] = useState(null);
    const [transactionComplete, setTransactionComplete] = useState(false);

    const handleChange=(e)=>setFormData({...formData,[e.target.id]:e.target.value});

    let headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_APIKEY,
        "user-id": getSessionData()?.user.customerId,
        "Authorization": `Bearer ${getSessionData()?.token}`
        };

    
    const confirmTransaction = () => {
        let payload = {
            "transactionToken": transactionData.transactionToken
          };
        TransactionService.Confirm(payload, headers)
        .then(data => {
            if(data.statusCode===200){
                console.log(data.body);
                setLoading(false);
                setTransactionComplete(true);
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

    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true);
        
        console.log(formData);
        let payload = {
            "userId": getSessionData()?.user.customerId,
            "accountNumber": accountNumber,
            "recipientPhoneNumber": formData['phone'],
            "recipientName": formData['name'],
            "amount": parseInt(formData['amount']),
            "description": formData['comments']
          };
        TransactionService.Inititate(payload, headers)
        .then(data => {
            if(data.statusCode===200){
                console.log(data.body);
                setTransactionData(data.body);
                setLoading(false);
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

  return (
    <div className='pb-8'>
        <PageTitle text={'Initiate New Transfer'} />
        <div className='flex flex-col items-center justify-center'>
        {loading && <Loader />}
        {error && <ErrorAlert title={"Error"} message={JSON.stringify(error.errors || error)} />}
            {!transactionData && !loading && !transactionComplete &&
            <form className="mt-8 w-1/2" onSubmit={handleSubmit}>
            <Input type={'text'} handleChange={handleChange} value={formData['phone']} isRequired={true} id="phone" labelText="Recipeient PhoneNumber" labelFor="phone" name="phone" placeholder="07xxxxxxxx" />
            <Input type={'text'} handleChange={handleChange} value={formData['name']} isRequired={true} id="name" labelText="Recipient Name" labelFor="name" name="name" placeholder="Recipient Name" />
            <Input type={'number'} handleChange={handleChange} value={formData['amount']} isRequired={true} id="amount" labelText="Amount" labelFor="amount" name="amount" placeholder="5000" />
            <TextArea handleChange={handleChange} value={formData['comments']} id='comments' labelText={'Desciption'} isRequired={true} />
            <ButtonAction text={'Submit'} />
        </form>}

        {transactionData && !transactionComplete &&
            <div>
                <p className='font-semibold'>Transaction Details</p>
                <div className='my-5'>
                <p><span className='font-semibold'>Recipient Name:</span> {transactionData.transactionRequest.recipientName}</p>
                <p><span className='font-semibold'>Recipient PhoneNumber:</span> {transactionData.transactionRequest.recipientPhoneNumber}</p>
                <p><span className='font-semibold'>Amount:</span> {transactionData.transactionRequest.amount}</p>
                <p><span className='font-semibold'>Description:</span> {transactionData.transactionRequest.description}</p>
                </div>
                
                <ButtonAction onClick={confirmTransaction} text={'Confim Transaction'} />
            </div>}

            {transactionComplete && 
                <div>
                <p className='font-semibold mb-8'>Transaction Processing ...</p>
                <span className='my-5 border border-gray-200 rounded py-2 px-4'>
                <Link to={'/history'}>View History </Link>
                </span>
                </div>}
        </div>
    </div>
  )
}

export default Transaction