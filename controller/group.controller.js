// const Student = require("../Schema/Student");
const CustomError = require("../utils/error");
// const Project = require("../Schema/Project");
const Group = require("../Schema/Group.schema.js");
const addGroup = async (req, res, next) => {
  try {
    const {
      groupName,
      membersId,
      groupLeaderId,
      membersName,
      groupLeaderName,
      subject,
      semester,
      academicYear,
      currentYear,
    } = req.body; //received from middleware
    const groupData = await Group.find({
      membersId,
      groupLeaderId,
      groupLeaderName,
      subject,
      semester,
      academicYear,
      currentYear,
    });
    if (groupData.length != 0) {
      next(CustomError(500, "Group Already Exist Already exist"));
    } else {
      const groupDetails = await new Group({
        groupName,
        membersId,
        groupLeaderId,
        membersName,
        groupLeaderName,
        subject,
        semester,
        academicYear,
        currentYear,
      });
      await groupDetails.save();
      res.status(200).json({
        message: "Group of Students created successfully",
        data: groupDetails,
      });
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};

// getAllproject Video
const getAllGroup = async (req, res, next) => {
  try {
    const allGroups = await Group.find();
    if (!allGroups) next(CustomError(404, "Groups Not Found"));
    else {
      res
        .status(200)
        .json({ message: "Groups fetched successfully ", data: allGroups });
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};

// GET video
const getGroup = async (req, res, next) => {
  try {
    // const project = await Project.findById();

    const groupDetails = await Group.findById(req.params.id);
    if (!groupDetails) next(CustomError(404, "Group is not found"));
    else {
      res
        .status(200)
        .json({ message: "Group Founded Sucessfully", data: groupDetails });
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const { guideId, guideName, approvedProjectId, projectStatus } = req.body;
    const isProjectApproved = projectStatus === "Approved"; // Simplify boolean assignment

    // Use Group model instead of Project model for findByIdAndUpdate
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      {
        guideId, // Object shorthand notation
        guideName,
        approvedProjectId,
        projectStatus,
        isProjectApproved,
      },
      { new: true, runValidators: true } // Add runValidators option to validate schema
    );

    if (!updatedGroup) {
      return next(CustomError(404, "Group not found")); // Use return to stop execution
    }

    res
      .status(200)
      .json({ message: "Group updated successfully", data: updatedGroup });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error")); // Use error.message for more detailed error
  }
};
// delete Project
const delGroup = async (req, res, next) => {
  try {
    const groupDetails = await Group.findById(req.params.id);
    if (!groupDetails)
      res
        .status(400)
        .json({ success: false, message: "Group Details Not Found" });

    try {
      await Group.findByIdAndDelete(req.params.id);
      res
        .status(201)
        .json({ success: true, message: "Group Deleted Successfully" });
    } catch (error) {
      next(CustomError(404, error));
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};

// Export both functions as an object
module.exports = {
  addGroup,
  getAllGroup,
  getGroup,
  updateStatus,
  delGroup,
};
