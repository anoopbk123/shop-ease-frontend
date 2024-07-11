import React, { useEffect, useState } from "react";
import ProfileCard from "../../components/profile-card/ProfileCard";
import { userProfile } from "../../Services/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigator = useNavigate();
  const [user, setUser] = useState(null);
  const fetchUserData = async () => {
    try {
      const res = await userProfile();
      const data = res.data;
      if (!data.status) {
        if (data.loginFailed) {
          toast.error(data.message);
          navigator("/login");
        } else {
          toast.error(data.message);
          navigator(-1);
        }
      }
      else{
        setUser(data.user)
        // console.log(data)
      }
    } catch (err) {
      toast.error(err.message);
      navigator(-1);
    }
  };
  useEffect(()=>{
    fetchUserData()
  },[])
  return (
    <div className="container user-profile-container">
      <div className="container mt-5 pt-5 mx-auto">
        <h2 className="h2 text-center">Profile</h2>
        <ProfileCard updateData ={fetchUserData} userDetails={user} />
      </div>
    </div>
  );
}
