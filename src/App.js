import React, {useContext, useEffect, useState} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AuthLayout from './components/AuthLayout';
import DashboardLayout from './components/DashboardLayout';
import { useAuthContext } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import LoginPage from './pages/LoginPage';
import SelectAccount from './pages/SelectAccount';
import Transaction from './pages/Transaction';

const AuthPage = () => (
  <BrowserRouter>
    <AuthLayout>
      <Routes>
        <Route path="*" element={<Navigate to='/'/>} />
        <Route path="/" element={<LoginPage/>} />
        <Route path="/select-account" element={<SelectAccount />} />
      </Routes>
    </AuthLayout>
  </BrowserRouter>
)

const DashboardPage = () => (
  <BrowserRouter>
    <DashboardLayout>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/transaction' element={<Transaction />} />
        <Route path='/history' element={<History />} />
      </Routes>
    </DashboardLayout>
  </BrowserRouter>
)

function App() {
  const {getSessionData} = useAuthContext();
  return (
    getSessionData()?.token != null ? <DashboardPage /> : <AuthPage />
  );
}

export default App;
