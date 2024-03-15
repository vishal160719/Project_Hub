const express = require("express");
const router = express.Router();
const {
  verifyToken,
  checkAdmin,
  checkFaculty,
} = require("../middleware/auth.middleware.js"); // Fix import statement

const {
  addGroup,
  //   updProject,
  getAllGroup,
  updateStatus,
  delGroup,
  getGroup,
  getGroupWithId,
  getGroupsByCriteria,
  updateGuide,
  getApprovedGroup,
  //   getProject,
  //   delProject,
  //   updStatus,
  //   getApproved,
  //   getUserProject,
  //   getUnapproved,
  //   getSemesterProject,
} = require("../controller/group.controller.js");

router.get("/getAll", getAllGroup);
router.get(
  "/groupsList/get/:academic/:currentYear/:subject/:semester",
  getGroupsByCriteria
);
router.get(
  "/groupsList/get/approved/:academic/:currentYear/:subject/:semester/:guideId",
  getApprovedGroup
);
router.get("/getWithMemberId/get/:memberId", getGroupWithId);
// router.get("/getApproved", getApproved);
// router.get("/get/:id", getProject);
// router.get("/get/user/:id", getUserProject);
// router.get("/get/project/unapproved", getUnapproved);
// get semester project
// router.get("/get/project/sem", getSemesterProject);

router.post("/add", addGroup); // here i have to check user too
// router.post("/getAll", getAllGroup); // here i have to check user too
// router.post("/getAll", getAllGroup); // here i have to check user too
router.get("/groupDetail/get/:id", getGroup); // here i have to check user too
// router.get("/get/approved/:id", getApprovedGroup); // here i have to check user too
router.put("/updateStatus/:id/:projId/status", updateStatus);
router.put("/update/guide/:groupId/:guideId/name", updateGuide);
// router.put("/updateStatus/:id", checkFaculty, updateStatus);
// router.put("/upd/status/:id/status", updStatus);
router.delete("/del/:id", checkFaculty, delGroup); // checkUser must be there
// router.put("/upd/:id", updProject);

module.exports = router;
