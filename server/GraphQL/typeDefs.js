const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type Employee {
    id: ID
    FirstName: String
    LastName: String
    Age: Int
    DateOfJoining: Date
    Title: String
    Department: String
    EmployeeType: String
    CurrentStatus: Int
    
  }
  type Query {
    getAllEmployee: [Employee]
  }

  input EmployeeInput {
    FirstName: String
    LastName: String
    Age: Int
    DateOfJoining: Date
    Title: String
    Department: String
    EmployeeType: String
    CurrentStatus: Int
    
  }

  type Mutation {
    createEmployee(employeeDetails: EmployeeInput): Employee
    updateEmployee(id: ID!, input: EmployeeInput!): Employee
    deleteEmployee(id: ID!): Employee
  }
`;

module.exports = typeDefs;
