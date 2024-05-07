import { gql } from "@apollo/client";

export const GET_EMP_LIST_QUERY = gql`
  query Query {
  getAllEmployee {
    id
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
