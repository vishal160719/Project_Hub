const Faculty = require("../Schema/Faculty.js");
// const Student = require("../Schema/Student.js");
const bcrypt = require("bcrypt");
const CustomError = require("../utils/error.js");
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const signup = async (req, res, next) => {
  try {
    const { name, email, password, isAdmin, role } = req.body;
    console.log("faculty server reg ", name, email, password, isAdmin, role);

    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty) {
      return next(CustomError(404, "faculty profile Already Exists"));
    }

    // const existingID = await Student.findOne({ studentId });
    // if (existingID) {
    //   return next(CustomError(404, "Student ID Already Exists"));
    // }

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    const newFaculty = new Faculty({
      name,
      email,
      password: hash,
      isAdmin,
      role,
    });

    await newFaculty.save();
    res.status(200).send({
      data: newFaculty,
      messgae: "Faculty profile created successfully!!",
    });
    console.log("Faculty profile created successfully");
  } catch (error) {
    console.log(error);
    next(error); // Pass the error to Express error handling middleware
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      throw CustomError("Please fill all the fields", 400);
    }

    const existingfaculty = await Faculty.findOne({ email });
    console.log("=>>", existingfaculty._id.toString());

    if (!existingfaculty) {
      throw CustomError("Invalid credentials", 400);
    }

    // if (!Faculty) return next(createError(404, "Faculty not found!!"));
    // console.log(Faculty);

    const pass = await bcrypt.compare(password, existingfaculty.password);
    if (!pass) {
      throw CustomError("Invalid credentials", 400);
    }
    // if (!pass) return next(createError(400, "Wrong Credentials"));

    const token = jwt.sign(
      { id: existingfaculty._id.toString() },
      process.env.JWT
    );
    const { ...otherDetails } = existingfaculty._doc;

    console.log("logged in sucess");
    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      message: "Faculty Logged Sucess",
      token,
      data: otherDetails,
    });
    console.log(token);
  } catch (error) {
    next(error);
  }
};

const delFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty)
      res.status(400).json({ success: false, message: "Faculty Not Found" });

    try {
      await Faculty.findByIdAndDelete(req.params.id);
      res.status(201).json({
        success: true,
        message: "Faculty Profile Deleted Successfully",
      });
    } catch (error) {
      next(CustomError(404, error));
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};

// const getAllStudents = async (req, res, next) => {
//   try {
//     const Facultys = await Student.find();
//     if (Facultys.length === 0) {
//       throw new CustomError("Faculty not found", 400);
//     } else {
//       res.status(200).json(Facultys);
//     }
//   } catch (error) {
//     // console.log("Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//     // next(error);
//   }
// };
// const getStudent = async (req, res, next) => {
//   try {
//     const Faculty = await Student.findById(req.params.id);
//     if (Faculty.length === 0) {
//       throw new CustomError("Faculty not found", 400);
//     } else {
//       res.status(200).json(Faculty);
//     }
//   } catch (error) {
//     // console.log("Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//     // next(error);
//   }
// };

// Export both functions as an object
module.exports = {
  signin,
  signup,
  delFaculty,
  //   getAllStudents,
  //   getStudent,
};
