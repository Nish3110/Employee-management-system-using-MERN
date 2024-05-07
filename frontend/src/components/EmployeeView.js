import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import "../style.css";
import { GET_EMP_LIST_QUERY } from "../GraphQL/Queries";
import empImage from "../../../server/bundle/3391a5800d33d8430fbc02ed867216d4.png" 

const EmployeeView = () => {
  const { loading, error, data } = useQuery(GET_EMP_LIST_QUERY);
  const [emp, setEmp] = useState({});
  const { id } = useParams();
  console.log(error); 
  const nav = useNavigate();
  useEffect(() => {
    if (!loading && data && data.getAllEmployee) {
      const employeesData = data.getAllEmployee;
      let updateData = employeesData.find((employee) => employee.id == id);
      setEmp(updateData);
    }
  }, [id, loading, data]);
  const EmployeeCard = (employee) => {
    console.log(employee);
    const {
      FirstName,
      LastName,
      Age,
      DateOfJoining,
      Title,
      Department,
      EmployeeType,
    } = employee.emp;
    return (
      <div className="card" style={{ width: '18rem' }}>
        <div className="d-flex justify-content-center">
        <img src={`http://localhost:5000/3391a5800d33d8430fbc02ed867216d4.png`} alt={`${FirstName} ${LastName}`} 
         style={{height:"13rem",width:"13rem"}}
      />
        </div>
      
      <div className="card-body">
        <h5 className="card-title">{`${FirstName} ${LastName}`}</h5>
        <p className="card-text">
          <strong>Age:</strong> {Age}
        </p>
        <p className="card-text">
          <strong>Date of Joining:</strong> {DateOfJoining?.split('T')[0] }
        </p>
        <p className="card-text">
          <strong>Title:</strong> {Title}
        </p>
        <p className="card-text">
          <strong>Department:</strong> {Department}
        </p>
        <p className="card-text">
          <strong>Employee Type:</strong> {EmployeeType}
        </p>
        {/* Add any other elements or components as needed */}
      </div>
    </div>
    );
  };

  return (

    
    <div className="container mt-2">
    <div className="row">
      <div className="col d-flex justify-content-end align-items-center mt-2">
        <button className="btn nav-btn" onClick={() => {
          nav("/")
        }}>
          Back
        </button>
      </div>
    </div>
    <div className="row d-flex justify-content-center mt-5">
      <div className="col-md-4">
        <EmployeeCard emp={emp} />
      </div>
    </div>
  </div>
  );
};

export default EmployeeView;
