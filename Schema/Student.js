const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const role = require("../utils/role.js");

// Define the projectRecord sub-schema
const ProjectRecordSchema = new Schema(
  {
    key: {
      type: String,
      // required: true,
    },
    value: {
      type: [String],
      // required: true,
    },
  },
  { _id: false }
);

const emailValidator = {
  validator: (value) => {
    // Modified email format validation to allow multiple dot-separated segments in the domain part
    return /^[^\s@]+@[^\s@]+\.[^\s@.]+$/.test(value);
  },
  message: "Invalid email format",
};

const passwordValidator = {
  validator: (value) => {
    // Basic password length validation
    return value.length >= 6;
  },
  message: "Password must be at least 6 characters long",
};

// Define the main schema for the student
const StudentSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Student Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email  is required"],
    trim: true,
    unique: true,
    // match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    validate: emailValidator,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    validate: passwordValidator,
  },
  currentYear: {
    // FE / SE / TE / BE
    type: String,
    // required: [true, "Current Year is required"],
  },
  semester: {
    // Even , ODD
    type: Number,
    // required: [true, "Number is required"],
  },
  academicYear:{
    type:String
  },
  // academicYear: {
  //   // 2023-2024
  //   type: String,
  //   required: true,
  // },
  startingYear: {
    // 2020
    type: Number,
    // required: [true, "Joining Year  is required"],
  },
  passingYear: {
    // 2024
    type: Number,
    // required: [true, "Passing Year  is required"],
  },
  branch: {
    type: String,
    // required: [true, "Branch  is required"],
  },
  role: {
    type: String,
    default: Object.values(role.Student)[0], // Selecting the first role from the array
    immutable: true,
  },
  studentId: {
    // 201994101
    type: String,
    // required: true,
  },
  projectRecord: {
    type: [ProjectRecordSchema],
    default: [],
  },
  skills: {
    type: [String],
    default: [],
  },
  aboutMe: {
    type: String,
    default: "Hii im Software developer",
  },
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
