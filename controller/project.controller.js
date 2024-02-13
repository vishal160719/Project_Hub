const ProjectIdea = require("../Schema/ProjectIdea.schema"); // Import the ProjectIdea schema
const CustomError = require("../utils/error");

const addProject = async (req, res, next) => {
  try {
    const {
      title,
      description,
      pdfLinks,
      currentYear,
      academicYear,
      semester,
      subject,
      groupId,
    } = req.body; //received from middleware

    const projectIdea = await ProjectIdea.create({
      title,
      description,
      pdfLinks,
      currentYear,
      academicYear,
      semester,
      subject,
      groupId,
    });

    res.status(200).json({
      message: "Project Idea created successfully",
      data: projectIdea,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

const getAllProject = async (req, res, next) => {
  try {
    const allProjectIdeas = await ProjectIdea.find();

    res.status(200).json({
      message: "Project Ideas fetched successfully",
      data: allProjectIdeas,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

// const getProjectIdea = async (req, res, next) => {
//   try {
//     const projectIdea = await ProjectIdea.findById(req.params.id);

//     if (!projectIdea) {
//       return next(CustomError(404, "Project Idea not found"));
//     }

//     res.status(200).json({
//       message: "Project Idea fetched successfully",
//       data: projectIdea,
//     });
//   } catch (error) {
//     next(CustomError(500, error.message || "Internal Server Error"));
//   }
// };

const updateProject= async (req, res, next) => {
  try {
    const updatedProjectIdea = await ProjectIdea.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProjectIdea) {
      return next(CustomError(404, "Project Idea not found"));
    }

    res.status(200).json({
      message: "Project Idea updated successfully",
      data: updatedProjectIdea,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

const delProject = async (req, res, next) => {
  try {
    const projectIdea = await ProjectIdea.findById(req.params.id);

    if (!projectIdea) {
      return res.status(404).json({
        success: false,
        message: "Project Idea not found",
      });
    }

    await ProjectIdea.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Project Idea deleted successfully",
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

const updateProjectStatus = async (req, res, next) => {
    try {
      // Get project id
      const projectId = req.params.id;
      // her we have to set the faculty id once the project get approved and status become false
  
      const updateProjectStatus = await ProjectIdea.findByIdAndUpdate(
        projectId,
        { $set: { isApproved: req.body.status, facultyId: req.body.facultyId } },
        { new: true } // Return modified document
      );
  
      if (updateProjectStatus) {
        res.status(200).json({
          success: true,
          message: "Project Status Updated Successfully",
          data: updateProjectStatus, // Corrected variable name here
        });
      } else {
        res.status(404).json({ success: false, message: "Project not found" });
      }
    } catch (error) {
      next(CustomError(500, error));
    }
  };

module.exports = {
  addProject,
  getAllProject,
  updateProject,
  delProject,
  updateProjectStatus
};
