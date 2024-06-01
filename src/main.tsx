import React from 'react'
import ReactDOM from 'react-dom/client'
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import App from './App.tsx'
import './index.css'
import AuthContextProvider from './Context/AuthContext/AuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <AuthContextProvider>
    <ToastContainer/>
    <App />
   </AuthContextProvider> 
  </React.StrictMode>,
)
