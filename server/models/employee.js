const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  FirstName: String,
  LastName: String,
  Age: Number,
  DateOfJoining: Date,
  Title: String,
  Department: String,
  EmployeeType: String,
  CurrentStatus: { type: Number, default: 1 }

});

const employeeModel = mongoose.model("employeeModel", employeeSchema, "employees");

module.exports = employeeModel;
