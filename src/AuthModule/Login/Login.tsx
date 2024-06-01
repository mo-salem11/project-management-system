import  { useContext, useState } from 'react'
import  './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../Constants/Urls';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import logo from "../../assets/PMS 3.svg";
import { emailValidation, passwordValidation } from "../Validator/Validator.js";
import Loading from '../../SharedModule/Loading/Loading.js';

function Login() {
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {saveLoginData}:any=useContext(AuthContext)
  async function handleLogin(values:any){
   try{
     const {data}:any=await axios.post(baseUrl+'/Users/Login',values);
     console.log(data.token)
     localStorage.setItem("userToken", data.token);
     toast.success("Welcome!");
     saveLoginData();
     navigate("/dashboard");
   }
   catch(error:any){
    toast.error(error?.response?.data?.message || "There's a mistake."); 
   }
   setIsLoading(false);
  }
  const {register,handleSubmit,formState:{errors}}=useForm();

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    handleLogin(values);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <section className="auth-container vh-100  d-flex flex-column justify-content-center align-items-center overflow-auto pageOverflow">
       <div className="logo">
          <img className="form-logo pb-2 " src={logo} alt="logo" />
        </div>
        <form 
        onSubmit={handleSubmit(onSubmit)}
        className="form  col-xl-5 col-lg-6 col-md-7 col-sm-9 col-10 rounded-4 p-sm-5 p-3"
        >
          <p className="text-light mb-0 mt-3">welcome to PMS</p>
          <h2 className="form-Name ">
            <span>L</span>ogin
          </h2> 
          <div className=" d-flex flex-column gap-3  mt-4">
             <div className=" one-input-group">
              <div
                className="form-outline my-2  text-start   "
                data-mdb-input-init
              >
                <label className="form-label  fw-medium mb-0">E-mail</label>
                <input
                  {...register("email", emailValidation)}
                  className="form-input form-control bg-transparent border-0 rounded-bottom-0  border border-bottom text-white p-1"
                  type="text"
                  placeholder="Enter your E-mail"
                  aria-label="readonly input example"
                />
                {errors?.email && (
                  <p className="mt-1  text-danger">{String(errors?.email?.message)}</p>
                )}
              </div>
            </div>
            <div className=" one-input-group">
              <div className="form-outline position-relative text-start d-flex flex-wrap">
                <label className="w-100 form-label fw-medium mb-0">
                  Password
                </label>
                <input
                  {...register("password", passwordValidation)}
                  type={!showPassword ? "text" : "password"}
                  className="form-input form-control bg-transparent border-0 rounded-bottom-0  border border-bottom text-white p-1 pb-0 flex-grow-1"
                  placeholder="Enter your password"
                  aria-label="readonly input example"
                />
                <button
                  onClick={togglePasswordVisibility}
                  type="button"
                  className="input-group-text border-0  bg-transparent position-absolute mt-4 end-0 p-2"
                >
                  <i
                    className={`far ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    } eye`}
                  ></i>
                </button>
              </div>
              {errors?.password && (
                <p className="  text-danger ">{String(errors?.password?.message)}</p>
              )}
            </div>
          </div>
          <div className="links flex-wrap d-flex justify-content-between align-items-center text-white mb-5 ">
            <Link to={"/register"} className="me-2">Register Now ?</Link>
            <Link to={"/forgot-password"}>Forget Password ?</Link>
          </div>
          <div className=" text-center">
            <button
              type="submit"
              className={`btn btn-warning text-center  text-white w-75 rounded-5  ${
                isLoading ? "noClick" : ""
              }`}
            >
              {isLoading ? <Loading components={false} /> : "Login"}
            </button>
          </div>    
        </form>
    </section>
   
  )
}

export default Login