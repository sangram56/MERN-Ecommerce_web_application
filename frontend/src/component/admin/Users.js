import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../actions/userAction";
import Loading from "../layout/Loading";
import MetaData from "../layout/MetaData";

const Users = () => {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.allUsers);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`All Users`} />
          <div className="container mt-5">
          <div className="my-3">
                <button className="btn  mb-5 btn-sm ">
                  <Link
                    to={"/admin/dashboard"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <i class="fa-solid fa-angles-left me-2"></i>
                    Back To Dashboard
                  </Link>
                </button>
              </div>
            <div className="row ordertable">
              <table className="table-responsive table-striped table-bordered text-center animate__animated  animate__fadeIn  ">
                <thead>
                  <tr>
                    <th scope="col">SL.NO</th>
                    <th scope="col">ProfileImage</th>

                    <th scope="col">ID</th>

                    <th scope="col">UserName</th>
                    <th scope="col">UserEmail</th>
                    <th scope="col">JoinedAt</th>
                  </tr>
                </thead>

                <tbody>
                  {users &&
                    users.map((item, key) => (
                      <>
                        <tr>
                          <td>{key + 1}</td>
                          <td className="p-2">
                            <img
                              src={item.avatar.url}
                              alt=""
                              style={{ width: "30px", borderRadius: "50%" }}
                            />
                          </td>

                          <td>{item._id}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.createdAt}</td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Users;
