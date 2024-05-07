import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_EMP_LIST_QUERY } from "../GraphQL/Queries";
import { useNavigate } from "react-router-dom";
import { DELETE_EMPLOYEE } from "../GraphQL/Mutators";
import { client } from "../App";

function EmpTable({ filterText }) {
  const { data } = useQuery(GET_EMP_LIST_QUERY);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);

  const [empList, setEmpList] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const newData = filterEmployees(data?.getAllEmployee, filterText);
    setEmpList(newData);
  }, [data, filterText]);

  const filterEmployees = (data, filterText) => {
    if (filterText.length === 0 || filterText.toLowerCase() === "all") {
      return data;
    }
    return data?.filter(
      (employee) =>
        employee.EmployeeType.toLowerCase() === filterText.toLowerCase()
    );
  };

  // Filter the employees based on filterText

  const deleteEmployees = (empId) => {
    deleteEmployee({ variables: { id: empId } })
      .then(() => {
        console.log("object");
        const employeesData = client.readQuery({ query: GET_EMP_LIST_QUERY });
        const newData = employeesData.getAllEmployee?.filter(
          (employee) => employee.id !== empId
        );
        console.log(newData);
        client.writeQuery({
          query: GET_EMP_LIST_QUERY,
          data: {
            getAllEmployee: [...newData],
          },
        });
      })
      .then()
      .catch((error) => {
        console.log(error);
      });
  };
  const rows =
    empList?.length > 0 ? (
      empList.map((emp) => (
        <tr key={emp.id}>
          <td>{emp.FirstName}</td>
          <td>{emp.LastName}</td>
          <td>{emp.Age}</td>
          <td>{emp.DateOfJoining.split("T")[0]}</td>
          <td>{emp.Title}</td>
          <td>{emp.Department}</td>
          <td>{emp.EmployeeType}</td>
          <td>{emp.CurrentStatus}</td>
          <td>
            <button
              onClick={() => {
                nav(`edit/${emp.id}`);
              }}
            >
              Edit
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                deleteEmployees(emp.id);
              }}
            >
              Delete
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                nav(`/${emp.id}`);
              }}
            >
              view
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={11} className="text-center">
          <b>No record found</b>
        </td>
      </tr>
    );
  return (
    <>
      <div className="container">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Age</th>
              <th scope="col">Date of Joining</th>
              <th scope="col">Title</th>
              <th scope="col">Department</th>
              <th scope="col">EmployeeType</th>
              <th scope="col">CurrentStatus</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </>
  );
}

export default EmpTable;
