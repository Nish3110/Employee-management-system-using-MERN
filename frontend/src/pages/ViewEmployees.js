import React, { useState } from "react";
import EmpTable from "../components/EmpTable";

const ViewEmployees = () => {
  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };
  return (
    <>
      <div className="main-container">
        <div className="d-flex align-items-center">
          <div className="">
            <select
              className="form-select fcontrol"
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="FullTime">FullTime</option>
              <option value="PartTime">PartTime</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </select>
          </div>
          <h1>Employee Data</h1>
        </div>

        <EmpTable filterText={filterText} />
      </div>
    </>
  );
};

export default ViewEmployees;
