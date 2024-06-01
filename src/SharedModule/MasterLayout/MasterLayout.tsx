import React from 'react'
import NavBar from '../NavBar/NavBar'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'


function MasterLayout() {
  return (
    <>
      <NavBar/>
      <div className="d-flex ">
    <div className="sidebar-container  d-none d-lg-block">
      <SideBar/>
    </div>
    <div className="main-Content w-100 m-3 rounded-2 overflow-auto pageOverflow  ">
      <Outlet/>
    </div>
  </div> 
    </>
  )
}

export default MasterLayout