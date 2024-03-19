const express = require("express");
const {
    createSubmission,
    updateSubmission,
    deleteSubmission,
//   getStudentById
} = require("../controller/submission");
const router = express.Router();

// CREATE A STUDENT
router.post("/add", createSubmission);
// router.get("/getStudentById/:id", getStudentById);

// UPDATE A STUDENT
router.put("/update/:id", updateSubmission);

// DELETE A STUDENT
router.delete("/del/:id", deleteSubmission);

module.exports = router;
