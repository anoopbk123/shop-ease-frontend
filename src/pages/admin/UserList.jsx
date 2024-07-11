import React, { useEffect, useState } from "react";
import { updateUserBlockStatus, userList } from "../../Services/adminApi";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function UserList() {
  const [usersData, setUsersData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate();
  const fetchUserList = async () => {
    try {
      const res = await userList();
      const data = res.data;
      if (!data.status) {
        toast.error(data.message);
        navigate(-1);
      } else {
        // console.log("users data", data);
        setUsersData(data.users);
      }
    } catch (err) {
      toast.error("try again later");
        navigate(-1);
        console.log(err);
    }
  };

  const upDateUser = async (userID, blockStatus) => {
    try {
      const res = await updateUserBlockStatus({ userID, blockStatus });
      const data = res.data;
      if (!data.status) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        fetchUserList();
      }
    } catch (err) {
      toast.error("please try again latter");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);
  return (
    <>
      <div className="container mt-5 pt-5 mx-auto">
        <div className="d-flex justify-content-between">
        <h2 className="text-center h2 mx-3">User List</h2>
        <div className="m-1">
          <select onChange={(e)=>{setSearchParams({userType:e.target.value})}} name="" id="">
            <option value="">All users</option>
            <option value="unBlockedUsers">Unblocked users</option>
            <option value="blockedUsers">Blocked users</option>
          </select>
        </div>
        </div>
        <div className="container">
          {usersData.length ? (
            <>
              {usersData
              .filter((value)=>{
                switch(searchParams.get('userType')){
                  case 'unBlockedUsers':
                    return !value.blockStatus;
                  case 'blockedUsers':
                    return value.blockStatus;
                  default:
                    return true
                }
              })
              .map((value, index) => (
                <div key={index} className="container m-1 box-shadow rounded p-2">
                  <div className="row">
                    {/*|| user_id */}
                    <div className="col-12">user_id: {value._id}</div>
                    <div className="col-12">Name: {value.userName}</div>
                    <div className="col-12">Email: {value.email}</div>
                    <div className="col-12">
                      Date Created: {value.dateCreated}
                    </div>
                    <div className="col-12">Phone: {value.phone}</div>
                    <div className="col-12">Address: {value.address}</div>
                  </div>
                  <div>
                    {value.blockStatus ? (
                      <button
                        onClick={() => {
                          upDateUser(value._id, value.blockStatus);
                        }}
                        className="btn btn-warning"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          upDateUser(value._id, value.blockStatus);
                        }}
                        className="btn btn-danger"
                      >
                        Block
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <h2>Loading....</h2>
            </>
          )}
        </div>
      </div>
    </>
  );
}
