import {lazy} from 'react';
import { Navigate } from 'react-router-dom';

const AuthLayout=lazy(()=>import('./SharedModule/AuthLayout/AuthLayout'));
const Login=lazy(()=>import('./AuthModule/Login/Login'));
const Register=lazy(()=>import('./AuthModule/Register/Register'));
const ForgetPassword=lazy(()=>import('./AuthModule/ForgetPassword/ForgetPassword'));
const ResetPassword=lazy(()=>import('./AuthModule/ResetPassword/ResetPassword'));
const ChangePassword=lazy(()=>import('./AuthModule/ChangePassword/ChangePassword'));
const VerifyAccount=lazy(()=>import('./AuthModule/VerifyAccount/VerifyAccount'));

const NotFound=lazy(()=>import('./SharedModule/NotFound/NotFound'));
const MasterLayout=lazy(()=>import('./SharedModule/MasterLayout/MasterLayout'));
const ProtectedRoute=lazy(()=>import('./SharedModule/ProjectedRoute/ProjectedRoute'));


const Dashboard=lazy(()=>import('./DashboardModule/Dashboard/Dashboard'));

const TasksList=lazy(()=>import('./TasksModule/Tasks/Tasks'));
const TasksForm=lazy(()=>import('./TasksModule/TasksForm/TasksForm'));
const TasksBoard=lazy(()=>import('./TasksModule/TasksBoard/TasksBoard'));

const UsersList=lazy(()=>import('./UsersModule/Users/Users'));

const ProjectForm=lazy(()=>import('./ProjectModule/ProjectForm/ProjectForm'));
const ProjectList=lazy(()=>import('./ProjectModule/ProjectList/ProjectList'));


// Define the dashboard routes
export const dashboardRoutes=[
  {
    path:"dashboard",
      element:(
       <ProtectedRoute><MasterLayout/></ProtectedRoute> 
      ),
      errorElement:<NotFound/>,
      children:
      [
        {index:true,element:<Dashboard/>},
        {path:"tasks",element:<TasksList/>},
        {path:"users",element:<UsersList/>},
        {path:"projects",element:<ProjectList/>},
        {path:"change-password",element:<ChangePassword/>},
        {path:"projects/projects-form/:action",element:<ProjectForm/>},
        {path:"tasks/tasks-form/:action",element:<TasksForm/>},
        {path:"tasks-board",element:<TasksBoard/>}
        
      ]
    
    }
]


// Define the auth routes
export const authRoutes= [
    {
      path: "",
      element: <AuthLayout />,
      errorElement:<NotFound/>,
      children: [
        {index:true,element: <Navigate to="login" replace/> },
        {path:'login',element:<Login/>},
        {path:"register",element:<Register/>},
        {path:"forgot-password",element:<ForgetPassword/>},
        {path:"reset-password",element:<ResetPassword/>},
        {path:"verify-account",element:<VerifyAccount/>},
      ],
    }
  ];










function AppRoutes() {
  return (
    <div>App-routes</div>
  )
}

export default AppRoutes