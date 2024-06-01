import { Navigate} from 'react-router-dom'

function ProjectedRoute({loginData,children}:any) {
  if(localStorage.getItem('userToken')==null && loginData==null){
    return <Navigate to="/"/>
}
else return children;
  
}

export default ProjectedRoute