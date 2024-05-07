const employeeModel = require("../models/employee");

const resolvers = {
  Query: {
    getAllEmployee: async () => {
      return await employeeModel.find();
    },
  },

  Mutation: {
    createEmployee: async (parent, args, context, info) => {
      console.log(args);
      const { DateOfJoining } = args.employeeDetails;

      const employee = new employeeModel({
        ...args.employeeDetails,
        DateOfJoining: new Date(DateOfJoining),
      });
      await employee.save();

      return employee;
    },
    updateEmployee: async (_, { id, input }) => {
      try {
        const updatedEmployee = await employeeModel.findByIdAndUpdate(id, input, {
          new: true,
        });

        if (!updatedEmployee) {
          throw new Error("No employee found with the given ID");
        }

        return updatedEmployee;
      } catch (error) {
        throw new Error("Error updating employee");
      }
    },
    deleteEmployee: async (_, { id }) => {
      try {
        const deletedEmployee = await employeeModel.findByIdAndDelete(id);
        if (!deletedEmployee) {
          throw new Error("No employee found with the given ID");
        }
        return deletedEmployee;
      } catch (error) {
        throw new Error("Error deleting employee");
      }
    },
    
  },
};

module.exports = resolvers;
