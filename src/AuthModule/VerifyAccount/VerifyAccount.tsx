import  { useEffect, useState } from 'react'
import  './VerifyAccount.module.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '../../Constants/Urls';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import logo from "../../assets/PMS 3.svg";
import Loading from '../../SharedModule/Loading/Loading';


function VerifyAccount() {
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    setUserEmail(localStorage.getItem("Email")||"");
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleVerify(values:any) {
    try {
    const {data} = await axios.put(`${baseUrl}/Users/verify `,values)
      toast.success(data?.message)
      navigate("/")  
      localStorage.removeItem("Email")  
    } catch (error:any) {
      toast.error(error?.response?.data?.message||"There's a mistake." );
    }
    setIsLoading(false)
  }
  function handleData(data:any) {
    const  values = {
        email:userEmail,
        code:data?.code
      }
        handleVerify(values);
    }
    const {register, handleSubmit, formState: { errors },} = useForm();
    
    const onSubmit = async (data:any) => {
      setIsLoading(true)
      handleData(data)
    };
  return (
    <section className='auth-container d-flex flex-column justify-content-center align-items-center'>
       <div className="logo">
          <img className="form-logo pb-2 " src={logo} alt="logo" />
        </div>
        <form 
        onSubmit={handleSubmit(onSubmit)}
        className="form  col-xl-5 col-lg-6 col-md-7 col-sm-9 col-10 bg-info rounded-4 p-sm-5 p-3"
        >
        <p className="text-light mb-0 mt-3">welcome to PMS</p>
          <h2 className="form-Name ">
            <span>V</span>erify Account
          </h2>
          <div className=" mt-4">
            <div className=" one-input-group">
              <div className="form-outline position-relative text-start d-flex flex-wrap">
                <label
                  className="w-100 form-label fw-medium mb-0"
                >
                  OTP Verification
                </label>
                <input
                  {...register("code", {
                    required: {
                      value: true,
                      message: "OTP is Required",
                    },
                    minLength: {
                      value: 4,
                      message: "OTP code must be at least 4 characters",
                    },
                  })}
                  type={"text"}
                  className="form-input form-control bg-transparent rounded-bottom-0  border-0 border border-bottom text-white p-1 pb-0 flex-grow-1"
                  placeholder="Enter Verification"
                  aria-label="readonly input example"
                />
              
              </div>
              {errors?.password && (
                <p className="  text-danger">{String(errors?.password?.message)}</p>
              )}
            </div>
         </div>
         <div className=" text-center">
            <button
              type="submit"
              className={`btn btn-warning text-center  text-white w-75 rounded-5  ${isLoading? "noClick":""}`}
            >
              {isLoading ? <Loading components={false}/> : "Save"}
            </button>
          </div>
        </form>
    </section>
  )
}

export default VerifyAccount