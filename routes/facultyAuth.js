const express = require("express");
const {
  signup,
  signin,
  delFaculty,
} = require("../controller/facultyController");
const { verifyToken, checkAdmin } = require("../middleware/auth.middleware"); // Fix import statement
const router = express.Router();

// CREATE A USER
router.post("/signup", signup);
// SIGN IN
router.post("/signin", signin);
router.delete("/del/:id", checkAdmin, delFaculty);

module.exports = router;
