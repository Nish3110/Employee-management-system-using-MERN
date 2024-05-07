import { gql } from "@apollo/client";

export const CREATE_EMP_MUTATION = gql`
  mutation Mutation($employeeDetails: EmployeeInput) {
    createEmployee(employeeDetails: $employeeDetails) {
      FirstName
      LastName
      Age
      DateOfJoining
      Title
      Department
      EmployeeType
      CurrentStatus
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: EmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      Age
      CurrentStatus
      DateOfJoining
      Department
      LastName
      FirstName
      EmployeeType
      Title
      id
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      Age
      CurrentStatus
      DateOfJoining
      Department
      LastName
      FirstName
      EmployeeType
      Title
      id
    }
  }
`;
