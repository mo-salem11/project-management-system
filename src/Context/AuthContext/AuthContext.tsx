import { ReactNode, createContext, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'


interface AuthContextType {
  loginData: any; // Replace `any` with the actual type of loginData if known
  saveLoginData: () => void;
  userRole: string;
}

export let AuthContext=createContext<AuthContextType|null>(null);
const AuthContextProvider: React.FC<{ children: ReactNode }> =({children})=> {
  const [loginData,setLoginData]=useState<any>(null);
  const [userRole,setUserRole]=useState<string>('');

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveLoginData()
    }  
  }, []);

  const saveLoginData=()=>{
    const encodedToken:any=localStorage.getItem("userToken");
    if(encodedToken!=(null||undefined)){
      const decodedToken:any=jwtDecode(encodedToken);   
      setLoginData(decodedToken);
      localStorage.setItem('loginData',JSON.stringify(decodedToken));
      setUserRole(decodedToken?.userGroup);
    }
   
  }
  
  return (
    <AuthContext.Provider value={{loginData,saveLoginData,userRole}}>
       {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider