import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonAction from '../components/ButtonAction'
import ErrorAlert from '../components/ErrorAlert'
import Input from '../components/Input'
import Loader from '../components/Loader'
import PageTitle from '../components/PageTitle'
import { useAuthContext } from '../contexts/AuthContext'
import { AuthService } from '../services/AuthService'

function LoginPage() {
    const {saveSessionData} = useAuthContext();
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({});
    const [userData, setUserData] = useState(null);

    // const navigate = useNavigate(); 
    // useEffect(() => {
    //     if(userData !== null) {
    //         navigate('/')
    //     }
    // }, [userData])

    const handleChange=(e)=>setFormData({...formData,[e.target.id]:e.target.value});

    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoading(true);
        
        let userData = {
            "email": formData['email'],
            "password": formData['password']
          };

          let headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
          };
        AuthService.Login(userData, headers)
        .then(data => {
            if(data.statusCode===200){
                saveSessionData(data.body);
                console.log(data.body);
                setUserData(data.body)
                window.location.reload(false);
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
    <div>
    <PageTitle text={'Login to Mobile Banking'} />
    {loading && <Loader />}
    {error && <ErrorAlert title={"Error"} message={JSON.stringify(error)} />}
        {!loading && 
        <form className="mt-8 space-y-6">
            <Input type={'email'} handleChange={handleChange} value={formData['email']} isRequired={true} id="email" labelText="Email" labelFor="email" name="email" placeholder="email@example.com" />
            <Input type={'password'} handleChange={handleChange} value={formData['password']} id="password" labelText="Password" labelFor="password" name="password" placeholder="password" />
            <ButtonAction onClick={handleSubmit} text={'Login'} />
        </form>}
    </div>
  )
}

export default LoginPage