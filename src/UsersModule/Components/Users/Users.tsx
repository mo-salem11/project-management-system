import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../../Constants/Components/Urls";
import { AuthContext } from "../../../Context/Components/AuthContext";
import Filter from "../../../SharedMoudule/Components/Filter/Filter";
import Loading from "../../../SharedMoudule/Components/Loading/Loading";
import NoData from "../../../SharedMoudule/Components/NoData/NoData";
import PagesHeader from "../../../SharedMoudule/Components/PagesHeader/PagesHeader";
import Pagination from "../../../SharedMoudule/Components/Pagination/Pagination";
import ViewModal from "../../../SharedMoudule/Components/ViewModal/ViewModal";
import active from "../../../assets/Active.jpg";
import noActive from "../../../assets/delete.png";
import styles from "./Users.module.css";
export default function UsersList() {
  let { loginData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [pagesArray, setPagesArray] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const [usersId, setUsersId] = useState("");
  const [isActivatedUser, setIsActivatedUser] = useState("");
  const [showToggle, setShowToggle] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [pageNum, setPageNum] = useState(1);
  const [showView, setShowView] = useState(false);

  const handleCloseView = () => setShowView(false);
  const handleShowView = () => setShowView(true);

  const handleCloseToggle = () => setShowToggle(false);
  const handleShowToggle = () => setShowToggle(true);

  async function getToggleActivatedEmployee() {
    try {
      const { data } = await axios.put(
        `${baseUrl}/Users/${usersId}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("userToken"),
          },
        }
      );
      getUsersList();
      handleCloseToggle();
      if (data.isActivated) {
        toast.success("Activation done 😍😍");
      } else {
        toast.success("Deactivation done ☹️☹️");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "There was a mistake toggling user activation."
      );
    }
  }

  async function getUsersList() {
    try {
      const data = await axios.get(
        `${baseUrl}/Users?pageSize=10&pageNumber=${pageNum}`,
        {
          headers: {
            Authorization: localStorage.getItem("userToken"),
          },
        }
      );

      setUsersList(data.data.data);
      setPagesArray(
        Array(data.data?.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
    } catch (error) {
      toast.error(error?.response?.data?.message || "There's a mistake.");
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (loginData?.userGroup === "Manager") {
      getUsersList();
    } else if (loginData?.userGroup === "Employee") {
      navigate("/dashboard");
    }
  }, [pageNum, loginData?.userGroup]);

  //? ===========handle Date==============>>
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    return formattedDate;
  };
  return (
    <>
      <div className="container-fluid d-flex flex-column textColer rounded-3 p-3  slide-in-bottom">
        <PagesHeader title={"Users"} />
        {!isLoading ? (
          <>
            <Filter setUsersList={setUsersList} />
            {usersList.length > 0 ? (
              <div
                className={`${styles.userslistContainer}  table-responsive w-100`}
              >
                <table className="w-100 table table-striped  mb-4  text-center">
                  <thead >
                    <tr>
                      <th>UserName</th>
                      <th>Email</th>
                      <th>Statues</th>
                      <th>Phone Number</th>
                      <th>Date Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="position-relative">
                    {usersList.map(
                      ({
                        id,
                        userName,
                        email,
                        isActivated,
                        phoneNumber,
                        creationDate,
                      } = user) => (
                        <tr className="tr-info" key={id}>
                          <td className="p-3">{userName}</td>
                          <td className="p-3">{email}</td>
                          <td className="p-3">
                            {isActivated ? (
                              <span className="text-bg-success p-1 rounded-1">
                                Active
                              </span>
                            ) : (
                              <span className="text-bg-danger p-1 rounded-1">
                                No Active
                              </span>
                            )}
                          </td>
                          <td className="p-3">{phoneNumber}</td>
                          <td className="p-3">
                            {formatDate(creationDate)}
                          </td>{" "}
                          <td className="p-3">
                            <div className="dropdown ">
                              <button
                                className="border-0 bg-×  rounded-3 pt-2 "
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className=" h5 me-1 fa-solid fa-ellipsis-vertical"></i>
                              </button>
                              <ul
                                className={`${styles.dropBtn} dropdown-menu text-black `}
                              >
                                <li className="position-relative">
                                  <span
                                    className={`${styles.triangle} position-absolute `}
                                  >
                                    <i className="border-1  h2 fa-solid fa-caret-up"></i>
                                  </span>
                                </li>
                                <li>
                                  {" "}
                                  <button
                                    onClick={() => {
                                      setUserDetails({
                                        id,
                                        userName,
                                        email,
                                        isActivated,
                                        phoneNumber,
                                        creationDate,
                                      });
                                      handleShowView();
                                    }}
                                    className="dropdown-item "
                                    type="button"
                                  >
                                    <i className="fa-solid h4 fa-eye me-2 text-success"></i>
                                    View
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => {
                                      setUsersId(id);
                                      setIsActivatedUser(isActivated);
                                      handleShowToggle();
                                    }}
                                    className="dropdown-item  d-flex align-items-center"
                                    type="button"
                                  >
                                    {isActivated ? (
                                      <i className="text-danger  fa-solid fa-toggle-off me-1"></i>
                                    ) : (
                                      <i className=" text-success fa-solid fa-toggle-on me-1"></i>
                                    )}
                                    Toggle
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
                <div>
                  {" "}
                  {usersList.length > 0 ? (
                    <Pagination
                      pagesArray={pagesArray}
                      setPageNum={setPageNum}
                      pageNum={pageNum}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              <NoData />
            )}
          </>
        ) : (
          <div className="  pt-5 mt-5 ">
            <Loading components={1} />
          </div>
        )}
      </div>

      <>
        <Modal
          show={showToggle}
          onHide={handleCloseToggle}
          centered
          keyboard={true}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="h5 text-center">
            {isActivatedUser ? (
              <div className="my-2 mx-5">
                <div className="text-center">
                  <img src={noActive} alt="noActive" className="w-100" />
                  <h5 className="fw-bold mt-2">Deactive This User ?</h5>
                  <h6>Are you sure you want to deactivate this user ?</h6>
                </div>
                <div className="text-end pt-3 border-top">
                  <button
                    className="btn btn-outline-danger fw-bold"
                    onClick={() => getToggleActivatedEmployee()}
                  >
                    {" "}
                    Yes
                  </button>
                </div>
              </div>
            ) : (
              <div className="my-2 mx-5">
                <div className="text-center">
                  <img src={active} alt="active" className="w-75 mb-3" />
                  <h5 className="fw-bold mt-2">Active This User ?</h5>
                  <h6>Are you sure to make this user active ?</h6>
                </div>
                <div className="text-end pt-3 border-top">
                  <button
                    className="btn btn-outline-danger fw-bold"
                    onClick={() => getToggleActivatedEmployee()}
                  >
                    {" "}
                    Yes
                  </button>
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>

        <ViewModal
          userDetails={userDetails}
          handleCloseView={handleCloseView}
          showView={showView}
        />
      </>
    </>
  );
}
