import {Suspense} from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import  './App.css'
import { authRoutes, dashboardRoutes } from './AppRoutes'
import Loading from './SharedModule/Loading/Loading'


function App() {
  

  const routes=createHashRouter([
    ...dashboardRoutes,
    ...authRoutes
  ])

  return (
    <Suspense fallback={<Loading components={true}/>}>
    <RouterProvider router={routes}/>
      </Suspense>
  )
}

export default App
