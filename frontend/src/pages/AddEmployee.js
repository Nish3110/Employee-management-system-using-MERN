import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_EMP_MUTATION } from "../GraphQL/Mutators";
import { client } from "../App";
import { GET_EMP_LIST_QUERY } from "../GraphQL/Queries";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const [formErrors, setFormErrors] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [currentStatus, setCurrentStatus] = useState(1);
  const nav = useNavigate();

  const [createEmployee, { error }] = useMutation(CREATE_EMP_MUTATION);

  // title
  const titleoptions = ["Employee", "Manager", "Director", "VP"];

  // Department:
  const departmentoptions = ["Marketing", "IT", "HR", "Engineering"];

  // EmployeeType
  const employeetypeoptions = ["FullTime", "PartTime", "Contract", "Seasonal"];

  const addEmployee = () => {
    const formErrors = {
      firstName: !firstName,
      lastName: !lastName,
      age: !age,
      dateOfJoining: !dateOfJoining,
      title: !title,
      department: !department,
      employeeType: !employeeType,
      // currentStatus: !currentStatus,
    };

    setIsSuccess(false);
    setFormErrors({ ...formErrors });

    if (Object.values(formErrors).some((v) => v)) return;

    createEmployee({
      variables: {
        employeeDetails: {
          FirstName: firstName,
          LastName: lastName,
          Age: +age,
          DateOfJoining: dateOfJoining,
          Title: title,
          Department: department,
          EmployeeType: employeeType,
          CurrentStatus: currentStatus,
        },
      },
    });

    if (error) {
      console.log(error);
    } else {
      const employeesData = client.readQuery({ query: GET_EMP_LIST_QUERY });
      const newEmployee = {
        FirstName: firstName,
        LastName: lastName,
        Age: +age,
        DateOfJoining: dateOfJoining,
        Title: title,
        Department: department,
        EmployeeType: employeeType,
        CurrentStatus: currentStatus,
      };
      client.writeQuery({
        query: GET_EMP_LIST_QUERY,
        data: {
          getAllEmployee: [...employeesData.getAllEmployee, newEmployee],
        },
      });

      setFormErrors(null);
      setFirstName("");
      setLastName("");
      setAge("");
      setDateOfJoining("");
      setTitle("");
      setDepartment("");
      setEmployeeType("");
      nav("/");
    }
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        <h1>Create Employee</h1>
      </div>
      {isSuccess && (
        <div className="alert alert-success" role="alert">
          <b>Success!</b> Employee has been added
        </div>
      )}
      <div className="container">
        <form className="form-horizontal" method="post">
          <div className="mb-2 form-group">
            <label className="form-label required" htmlFor="firstname">
              First Name
            </label>
            <input
              type="text"
              className={`form-control ${
                formErrors &&
                (formErrors?.firstName ? "is-invalid" : "is-valid")
              }`}
              id="firstname"
              placeholder="Enter First Name"
              name="firstname"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.currentTarget.value);
              }}
            />
            <div className="invalid-feedback">Please enter First name</div>
          </div>
          <div className="mb-2">
            <label className="form-label required" htmlFor="lastname">
              Last Name
            </label>
            <input
              type="text"
              className={`form-control ${
                formErrors && (formErrors?.lastName ? "is-invalid" : "is-valid")
              }`}
              id="lastname"
              placeholder="Enter Last name"
              name="lastname"
              value={lastName}
              onChange={(e) => {
                setLastName(e.currentTarget.value);
              }}
            />
            <div className="invalid-feedback">Please enter Last name</div>
          </div>
          <div className="mb-2">
            <label className="form-label required" htmlFor="age">
              Age
            </label>
            <input
              type="number"
              className={`form-control ${
                formErrors && (formErrors?.age ? "is-invalid" : "is-valid")
              }`}
              id="age"
              placeholder="Enter age"
              name="age"
              value={age}
              onChange={(e) => {
                setAge(e.currentTarget.value);
              }}
            />
            <div className="invalid-feedback">Please enter age</div>
          </div>
          <div className="mb-2">
            <label className="form-label required" htmlFor="dateofjoining">
              Date Of Joining
            </label>
            <input
              type="date"
              className={`form-control ${
                formErrors &&
                (formErrors?.dateOfJoining ? "is-invalid" : "is-valid")
              }`}
              id="dateofjoining"
              name="dateofjoining"
              value={dateOfJoining}
              onChange={(e) => {
                setDateOfJoining(e.currentTarget.value);
              }}
            />
            <div className="invalid-feedback">
              Please provide date of Joining
            </div>
          </div>

          <div className="mb-2 form-group">
            <label className="form-label required" htmlFor="title">
              Title
            </label>

            <select
              className={`form-control ${
                formErrors && (formErrors?.title ? "is-invalid" : "is-valid")
              }`}
              id="title"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.currentTarget.value);
              }}
            >
              <option>Please choose one option</option>
              {titleoptions.map((option, index) => {
                return <option key={index}>{option}</option>;
              })}
            </select>
            <div className="invalid-feedback">Please select a title</div>
          </div>

          <div className="mb-2 form-group">
            <label className="form-label required" htmlFor="department">
              Department
            </label>

            <select
              className={`form-control ${
                formErrors &&
                (formErrors?.department ? "is-invalid" : "is-valid")
              }`}
              id="department"
              name="department"
              value={department}
              onChange={(e) => {
                setDepartment(e.currentTarget.value);
              }}
            >
              <option>Please choose one option</option>
              {departmentoptions.map((option, index) => {
                return <option key={index}>{option}</option>;
              })}
            </select>
            <div className="invalid-feedback">Please select a department</div>
          </div>

          <div className="mb-2 form-group">
            <label className="form-label required" htmlFor="employeeType">
              Employee Type
            </label>

            <select
              className={`form-control ${
                formErrors &&
                (formErrors?.employeeType ? "is-invalid" : "is-valid")
              }`}
              id="employeeType"
              name="employeeType"
              value={employeeType}
              onChange={(e) => {
                setEmployeeType(e.currentTarget.value);
              }}
            >
              <option>Please choose one option</option>
              {employeetypeoptions.map((option, index) => {
                return <option key={index}>{option}</option>;
              })}
            </select>
            <div className="invalid-feedback">
              Please select an employee Type
            </div>
          </div>

          <div className="mb-3">
            <button
              type="button"
              className="btn btn-success"
              onClick={addEmployee}
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddEmployee;
