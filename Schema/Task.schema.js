const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      maxLength: [150, "title should not exceed 150 character"],
      required: [true, "title is required"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "description is required"],
    },
    assignedDate: {
      type: Date, // Change type to Date
      required: [true, "assignedDate is required"],
    },
    deadline: {
      type: Date, // Change type to Date
      required: [true, "deadline is required"],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group", // Re ference to the Group model
        required: true,
    },
    facultyId: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
        default:null,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("TaskAssigned", TaskSchema);

module.exports = Task;
