import React, {useContext, useEffect, useState} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const AuthPage = () => (
  <BrowserRouter>
      <AuthLayout>
          <Routes>
              <Route path="*" element={<Navigate to='/'/>} />
              <Route path="/" element={<LoginPage/>} />
          </Routes>
      </AuthLayout>
  </BrowserRouter>
)

const DashboardPage = () => (
  <BrowserRouter>
      <DashboardLayout>
          <Routes>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/transaction' element={<Transaction />} />
              <Route path='/history' element={<History />} />
          </Routes>
      </DashboardLayout>
  </BrowserRouter>
)

function App() {
  return (
    <AuthPage />
  );
}

export default App;
