import React, { useState } from "react";
import "./Filter.css";

export default function Filter({category, setSearchParams}) {
  //filter icon toggle
  const [toggleFilter, setToggleFilter] = useState("hidden");
  const [filterData, setFilterData] = useState({category:''})
  const handleFilterDataChange = (e)=>{
    const {name, value} = e.target
    setFilterData((previousData)=>{
      return {
        ...previousData,
        [name]:value
      }
    })
  }
  const handleFilterFormSubmit = e =>{
    e.preventDefault()
    setSearchParams(filterData)
    setToggleFilter('hidden')
  }
  return (
    <div className="filter-container">
      {/* || filter form */}
      <div
        className={`row m-5 p-3 position-fixed bottom-0 end-0 filter-form-container filter-form  bg-primary text-white ${
          toggleFilter === "hidden" ? "filter-form-hidden" : "filter-form-show"
        }`}
      >
        <form className="filter-form" onSubmit={handleFilterFormSubmit}>
          <div className="col-12">
            <select onChange={handleFilterDataChange} name="category" className="form-select filter-category" aria-label="Default select example">
              <option value="">
                All Category 
              </option>
              {category.map((value, index) =>(
              <option key={index} value={value}>{value}</option>
              ))}
            </select>
          </div>
          {/* ||Price */}
          <label className="col-4 form-label" htmlFor="price-from">
            Price:
          </label>
          <div className="row">
          <div className="col-6 d-block">
            <input
              type="number"
              className="form-control"
              placeholder="From"
              id="price-from"
            />
          </div>
          <div className="col-6 d-block">
            <input
              type="number"
              className="form-control"
              placeholder="To"
              id="price-to"
            />
          </div>
          </div>
          {/* ||Quantity */}
          <label className="col-4 form-label" htmlFor="quantity-from">
          Quantity:
          </label>
          <div className="row">
          <div className="col-6 d-block">
            <input
              type="number"
              className="form-control"
              placeholder="From"
              id="quantity-from"
            />
          </div>
          <div className="col-6 d-block">
            <input
              type="number"
              className="form-control"
              placeholder="To"
              id="quantity-to"
            />
          </div>
          </div>
          <div className="row">
            <div className="col-12 m-2 text-center">
            <button type="submit" className="btn btn-warning">Filter</button>
            </div>
          </div>
        </form>
      </div>
      {/* || filter icon */}
      <span
        className="filter-icon-container display-5 position-fixed bottom-0 end-0 m-2 m-md-1 z-3"
        onClick={() =>
          toggleFilter === "hidden"
            ? setToggleFilter("show")
            : setToggleFilter("hidden")
        }
      >
        <i
          className={`${
            toggleFilter === "hidden"
              ? "bi bi-filter-circle-fill"
              : "bi bi-x-circle"
          }`}
        ></i>
      </span>
    </div>
  );
}
