const Faculty = require("../Schema/Faculty.js");
const Student = require("../Schema/Student.js");
const bcrypt = require("bcrypt");
const CustomError = require("../utils/error.js");
var JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const signup = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      startingYear,
      passingYear,
      currentYear,
      branch,
      studentId,
      academicYear
    } = req.body;
    console.log(
      "server  reg ",
      name,
      email,
      password,
      startingYear,
      passingYear,
      branch,
      studentId,
      academicYear
    );

    const existingFaculty = await Student.findOne({ email });
    if (existingFaculty) {
      return next(CustomError(404, "Student Already Exists"));
    }

    // const existingID = await Student.findOne({ studentId });
    // if (existingID) {
    //   return next(CustomError(404, "Student ID Already Exists"));
    // }

    var salt = bcrypt.genSaltSync(10);
    console.log(salt);
    var hash = bcrypt.hashSync(password, salt);

    const newStudent = new Student({
      name,
      email,
      password: hash,
      startingYear,
      passingYear,
      currentYear,
      branch,
      studentId,
      academicYear
    });

    await newStudent.save();
    res
      .status(200)
      .send({ message: "Student created successfully!!", data: newStudent });
    console.log("Student created successfully");
  } catch (error) {
    console.log(error);
    next(error); // Pass the error to Express error handling middleware
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password, currentYear, academicYear } = req.body;

    console.log("Request Body:", req.body);

    // validation
    if (!email || !password || !currentYear || !academicYear) {
      throw CustomError("Please fill all the fields", 400);
    }

    const studentDetail = await Student.findOne({ email });

    console.log("Student Detail:", studentDetail);

    if (!studentDetail) {
      throw CustomError("Invalid credentials", 400);
    }

    const pass = await bcrypt.compare(password, studentDetail.password);
    console.log("Password Comparison Result:", pass);

    if (!pass) {
      throw CustomError("Invalid credentials", 400);
    }

    const token = JWT.sign({ id: studentDetail._id }, process.env.JWT_SECRET);
    const { ...otherDetails } = studentDetail._doc;

    console.log("Logged in successfully");
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ token, ...otherDetails });
    console.log("Token:", token);
  } catch (error) {
    console.error("Error in signin controller:", error);
    next(error);
  }
};
const getAllStudents = async (req, res, next) => {
  try {
    const Facultys = await Student.find();
    if (Facultys.length === 0) {
      throw CustomError("Faculty not found", 400);
    } else {
      res.status(200).json(Facultys);
    }
  } catch (error) {
    // console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
    // next(error);
  }
};
const getStudent = async (req, res, next) => {
  try {
    const Faculty = await Student.findById(req.params.id);
    if (Faculty.length === 0) {
      throw CustomError("Faculty not found", 400);
    } else {
      res.status(200).json(Faculty);
    }
  } catch (error) {
    // console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
    // next(error);
  }
};

const getStudentNameById = async (req, res, next) => {
  try {
    // Extract the student ID from the request parameters
    const studentId = req.query.studentId;

    console.log("Received student ID:", studentId);

    // Find the student by their student ID
    const student = await Student.findOne({ studentId });

    console.log("Found student:", student);

    // If no student is found with the provided student ID, return a 404 error
    if (!student) {
      return next(CustomError(404, "Student not found"));
    }

    // Extract and send the student's name in the response
    const { name, _id } = student;
    res.status(200).json({ name, _id });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error:", error);
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

// Export both functions as an object
module.exports = {
  signin,
  signup,
  getAllStudents,
  getStudent,
  getStudentNameById,
};
