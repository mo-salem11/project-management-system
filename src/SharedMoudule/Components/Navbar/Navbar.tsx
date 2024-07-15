import "./Navbar.css";
import logo from "../../../assets/nav-logo.png";
import Notification from "../../../assets/Group.png";
import avatar from "../../../assets/Avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/Components/AuthContext";
import { toast } from "react-toastify";
import ChangePassword from "../../../AuthModule/Components/ChangePassword/ChangePassword";
import { ThemeContext, ITheme } from "../../../Context/Components/ThemeContext";
import logo1 from "../../../assets/PMS 3.png";
import Logout from "../Logout/Logout";


export default function Navbar() {
  const { toggleTheme,isDarkMode }:ITheme = useContext(ThemeContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  let { loginData } = useContext(AuthContext);
  const { userRole }:string = useContext(AuthContext);

  const [showLogout, setShowLogout] = useState(false);

  const handleCloseLogout = () => setShowLogout(false);
  const handleShowLogout = () => setShowLogout(true);

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("loginData");
    toast.success("BYE BYE");
    navigate("/");
  };
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <>
      <ChangePassword show={show} handleClose={handleClose} />

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid ">
          <Link className="mb-3" to={"/dashboard"}>
          {isDarkMode ? (
        <img className="w-100 main-logo" src={logo1} alt="Dark Logo" />
      ) : (
          <img className="w-100 main-logo" src={logo} alt="logo" />
          )}
          </Link>
          <button
            className="navbar-toggler p-1 border-0 "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse  "
            id="navbarSupportedContent"
          >
            <ul className="ms-auto  navbar-nav mb-2 mb-lg-0">
              <li className={`userInfo ${isDarkMode?'mainColor':'bg-light'} p-3 p-md-2 rounded-4 mx-auto position-relative d-flex flex-wrap align-items-center`}>
                <div className="Notification">
                  <img src={Notification} alt="Notification-Bill" />
                </div>

                <div className="info d-flex align-items-center justify-content-between">
                  <div>
                    <img
                      className="w-100 ms-3 me-2 my-image"
                      src={avatar}
                      alt="userImg"
                    />
                  </div>
                  <div>
                    <h5>{loginData?.userName}</h5>
                    <h6 className={`${isDarkMode?'text-light':'text-secondary'} text-opacity-50`}>
                      {loginData?.userEmail}
                    </h6>
                  </div>
                </div>
              </li>
            </ul>

            {/* smell screen */}

            <ul className={`ms-auto  d-lg-none  navbar-nav mb-2 mb-lg-0 ${isDarkMode?'':"bg-light rounded-4 py-3"}`}>
              <li className=" mx-auto smell-screen-link  position-relative d-flex align-items-center">
                <Link to={"/dashboard"} className="text-black">
                  Home
                </Link>
              </li>
              {loginData?.userGroup === "Manager" ? (
                <li className="mx-auto smell-screen-link position-relative d-flex align-items-center">
                  <Link to={"/dashboard/users"} className="text-black">
                    Users
                  </Link>
                </li>
              ) : (
                ""
              )}
              
              <li className="mx-auto smell-screen-link position-relative d-flex align-items-center">
              <Link to={"/dashboard/projects"} className="text-black">
                Projects
              </Link>
            </li>
              

              {userRole == "Employee" ? 
            (
              <li className="mx-auto smell-screen-link position-relative d-flex align-items-center">
              <Link to={"/dashboard/tasks-board"} className="text-black">
              Tasks Board
              </Link>
            </li>
            ) 
            : 
            (
              <li className="mx-auto smell-screen-link position-relative d-flex align-items-center">
                <Link to={"/dashboard/tasks"} className="text-black">
                  Tasks
                </Link>
              </li>
            )
            }

                <button
                  type="button"
                  onClick={handleShow}
                  className="rounded-3 mt-1 bg-success my-3  mx-auto border-0 p-2 text-white"
                >
                 🛠 ChangePassword 🛠
                </button>
                
            <li className="mx-auto ">
            {<button
            className={isDarkMode === true ?"btn btn-secondary rounded-3 mt-1 my-3 p-2 ":"btn btn-dark rounded-3 mt-1 my-3 p-2"}  
            onClick={toggleTheme}
            
          >
            <i>
            {
              isDarkMode === true ? (<i className="fa-solid fa-toggle-on me-2"></i>) : (<i className="fa-solid fa-toggle-off me-2 "></i>)
            }
            </i>
            <h6>
            {
              isDarkMode === true ? ("Light theme") : ("Dark theme")
            }
            </h6>
            </button>} 
            
            </li>
         
              <button
                onClick={handleShowLogout}
                className="rounded-3 mt-1 bg-danger w-25 mx-auto border-0 p-2 text-white"
                type="button"
              >
                Logout <i className="fa fa-arrow-right-from-bracket  ms-1"></i>
              </button>
      <Logout logout={logout}  handleCloseLogout={handleCloseLogout}  showLogout={showLogout}/>

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
