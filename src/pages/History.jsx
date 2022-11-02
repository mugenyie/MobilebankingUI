import React, { useEffect, useState } from 'react'
import ButtonAction from '../components/ButtonAction';
import PageTitle from '../components/PageTitle'
import { useAuthContext } from '../contexts/AuthContext';
import { TransactionService } from '../services/TransactionService';
import JsPDF from 'jspdf';

const generatePDF = () => {

    const report = new JsPDF('landscape','pt','a2');
    report.html(document.querySelector('#report')).then(() => {
        report.save('report.pdf');
    });
}

function History() {
    const {getSessionData, accountNumber} = useAuthContext();
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [accountHistory, setAccountHistory] = useState(null);

    useEffect(() => {
        let headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "x-api-key": process.env.REACT_APP_APIKEY,
            "user-id": getSessionData()?.user.customerId,
            "Authorization": `Bearer ${getSessionData()?.token}`
            };

        TransactionService.History(accountNumber, headers)
        .then(data => {
            if(data.statusCode===200){
                console.log(data.body);
                setLoading(false);
                setAccountHistory(data.body);
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
    },[accountNumber])

  return (
    <div>
        <PageTitle text={'Transaction History'} />
        <ButtonAction onClick={generatePDF} text={"Export to PDF"} className={'w-32 mb-8'} />
        <table id='report' className="min-w-max w-full table-auto">
        <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 text-left">Date (UTC)</th>
                <th className="py-3 text-left">Amount</th>
                <th className="py-3 text-left">Desciption</th>
                <th className="py-3 text-left">Recipient Name</th>
                <th className="py-3 text-left">Recipient Phone</th>
                <th className="py-3 text-left">New Balance</th>
            </tr>
        </thead>
        <tbody className="text-gray-600 dark:text-white text-sm font-light">
          {accountHistory?.map((account,index) => (
          <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 text-black">
            <td className="py-3 text-left">
              <span>{account.createdOnUTC}</span>
            </td>
            <td className="py-3 text-left">
              <span>{account.amount.toLocaleString('en-us')}</span>
            </td>
            <td className="py-3 text-left">
              <span>{account.description}</span>
            </td>
            <td className="py-3 text-left">
              <span>{account.recipientName}</span>
            </td>
            <td className="py-3 text-left">
              <span>{account.recipientId}</span>
            </td>
            <td className="py-3 text-left">
              <span>{account.newBalance}</span>
            </td>
          </tr>
          ))}
        </tbody>
        </table>
    </div>
  )
}

export default History