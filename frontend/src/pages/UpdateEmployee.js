import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { CREATE_EMP_MUTATION, UPDATE_EMPLOYEE } from "../GraphQL/Mutators";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../App";
import { GET_EMP_LIST_QUERY } from "../GraphQL/Queries";

function UpdateEmployee() {
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
  const { id } = useParams();

  const [updateEmp, { error }] = useMutation(UPDATE_EMPLOYEE);
  const nav = useNavigate();

  // title
  const titleoptions = ["Employee", "Manager", "Director", "VP"];

  // Department:
  const departmentoptions = ["Marketing", "IT", "HR", "Engineering"];


  // EmployeeType

  const updateEmployee = () => {
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
    updateEmp({
      variables: {
        input: {
          FirstName: firstName,
          LastName: lastName,
          Age: +age,
          DateOfJoining: dateOfJoining,
          Title: title,
          Department: department,
          EmployeeType: employeeType,
          CurrentStatus: currentStatus == "false" ? 0 : 1,
        },
        id: id,
      },
    });

    if (error) {
      console.log(error);
    } else {
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

  useEffect(() => {
    if (id) {
      const employeesData = client.readQuery({ query: GET_EMP_LIST_QUERY });
      let updateData = employeesData?.getAllEmployee?.filter(
        (employee) => employee.id === id
      )[0];
      if (updateData) {
        setFirstName(updateData.FirstName);
        setLastName(updateData.LastName);
        setDateOfJoining(updateData.DateOfJoining);
        setAge(updateData.Age);
        setCurrentStatus(updateData.CurrentStatus);
        setTitle(updateData.Title);
        setDepartment(updateData.Department);
        setEmployeeType(updateData.EmployeeType);
      }
    }
  }, [id]);
  return (
    <>
      <div className="d-flex justify-content-center">
        <h1>Update Employee</h1>
      </div>
      {isSuccess && (
        <div className="alert alert-success" role="alert">
          <b>Success!</b> Employee has been added
        </div>
      )}
      <div className="container">
        <form className="form-horizontal" method="post">
          <div className="mb-2 form-group">
            <label className="form-label required" htmlFor="title">
              Title
            </label>

            <select
              className={`form-control ${
                formErrors &&
                (formErrors?.currentStatus ? "is-invalid" : "is-valid")
              }`}
              id="status"
              name="status"
              value={currentStatus}
              onChange={(e) => {
                setCurrentStatus(e.currentTarget.value);
              }}
            >
              <option selected value={true}>
                Active
              </option>
              <option value={false}>In Active</option>
            </select>
            <div className="invalid-feedback">Please select a title</div>
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

          <div className="mb-3">
            <button
              type="button"
              className="btn btn-success"
              onClick={updateEmployee}
            >
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateEmployee;
