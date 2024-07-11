import React, { useState } from "react";
import formValidator from "../../data/formValidator";
import { toast } from "react-toastify";
import { userProfileEdit } from "../../Services/userApi";

export default function ProfileCard({ userDetails, updateData }) {
  const [editData, setEditData] = useState({
    address:''
  })
  const handleEditClick = (userDetails)=>{
    setEditData((previousData)=>{
      return{
        ...previousData,
        address:userDetails.address
      }
    })
  }

  const handleEditFormChange = e => {
    const {name, value} = e.target
    setEditData((previousData)=>{
      return {
        ...previousData,
        [name]:value
      }
    })
  }

  const handleEditFormSubmit=async (e)=>{
    e.preventDefault()
    if(!formValidator.address(editData.address)){
      toast.error('invalid address');
      return
    }
    try{
      const res = await userProfileEdit(editData)
    // console.log('res',res)

      if(res.data.status){
        toast.success(res.data.message)
        updateData()
      }
      else{
        toast.error(res.data.message)
      }
    }
    catch(err){
      toast.error(err.message)
    }
  }

  return (
    <>
  {userDetails ? (
    <>
      <div className="container m-1 mt-sm-5 box-shadow rounded p-3 bg-light">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <span className="fw-semibold">Name:</span> {userDetails.name}
            </div>
            <div className="mb-3">
              <span className="fw-semibold">Email:</span> {userDetails.email}
            </div>
            <div className="mb-3">
              <span className="fw-semibold">Phone:</span> {userDetails.phone}
            </div>
            <div className="mb-3">
              <span className="fw-semibold">Address:</span> {userDetails.address}
            </div>
          </div>
          <div className="col-md-6">
            <div className="text-center">
              <button
                onClick={() => { handleEditClick(userDetails) }}
                className="btn btn-warning mt-4"
                data-bs-toggle="modal"
                data-bs-target="#edit-address-modal"
              >
                Edit Address
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Address Modal */}
      <div className="modal fade" id="edit-address-modal" tabIndex="-1" aria-labelledby="edit-address-modal-label" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="edit-address-modal-label">Change Address</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditFormSubmit} id="edit-address-form">
                <div className="mb-3">
                  <label htmlFor="edit-address-input" className="form-label">New Address</label>
                  <input
                    onChange={handleEditFormChange}
                    name="address"
                    value={editData.address}
                    placeholder="Enter new address"
                    type="text"
                    className="form-control"
                    id="edit-address-input"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" form="edit-address-form" className="btn btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="text-center p-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )}
</>

  );
}
