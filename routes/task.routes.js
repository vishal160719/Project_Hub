const express = require("express");
const router = express.Router();
const {
  verifyToken,
  checkAdmin,
  checkFaculty,
} = require("../middleware/auth.middleware.js"); // Fix import statement

const {
    createTask,
    updateTaskById,
    getAllTasks,
    deleteTaskById,
    updateApprovalStatus
} = require("../controller/task.controller.js");

router.get("/getAll", getAllTasks);
// router.get("/getApproved", getApproved);
// router.get("/get/:id", getProject);
// router.get("/get/user/:id", getUserProject);
// router.get("/get/project/unapproved", getUnapproved);
// get semester project
// router.get("/get/project/sem", getSemesterProject);

router.post("/add", createTask); // here i have to check user too
router.put("/update/:id", updateTaskById);
router.put("/updateStatus/:id", updateApprovalStatus);
// router.put("/upd/status/:id/status", updStatus);
router.delete("/del/:id", deleteTaskById); // checkUser must be there
// router.put("/upd/:id", updProject);

module.exports = router;
