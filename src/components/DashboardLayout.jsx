import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export default function DashboardLayout({children}) {
    const {logOut, getSessionData, setAccountNumber, accountNumber} = useAuthContext();

    const switchAccount = (x) =>{
        console.log(x);
        setAccountNumber(x);
        // window.location.reload(true);
    }

    return (
      <div className="min-h-full h-screen flex flex-col px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-row justify-between">
            <div className="font-semibold text-gray-500 text-3xl">
                <Link to={'/'}>Welcome {getSessionData()?.user?.fullName}</Link>
            </div>
            <div className="flex flex-row gap-8">
                <div className="text-xs text-gray-500">
                <span className="font-semibold text-base">Accounts</span>
                    {getSessionData()?.user?.accounts.map(account => 
                        <div onClick={() => switchAccount(account.accountNumber)} key={account.accountNumber} 
                         className={`${(account.accountNumber == accountNumber) && 'bg-black text-white'} w-32 flex flex-col border-y border-gray-200 cursor-pointer py-2 px-3`}>
                            <span>{account.accountNumber}</span>
                            <span>{account.name}</span>
                        </div>)}
                    </div>
                <div>
                    <span onClick={() => logOut()} className="font-semibold text-2xl text-gray-500 cursor-pointer">LogOut ?</span>
                </div>
            </div>
        </div>
          {children}
      </div>
    )
  }
  