const express = require("express");
const {
  signup,
  signin,
  getAllStudents,
  getStudent,
  getStudentNameById
} = require("../controller/auth");
const router = express.Router();

// CREATE A USER
router.post("/signup", signup); // user can be created using the same route for now
// // SIGN IN
router.post("/signin", signin);
router.get("/getAllStudents", getAllStudents);
router.get("/getStudent/:id", getStudent);
router.get("/getStudentByID", getStudentNameById);

module.exports = router;
