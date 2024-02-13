const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubjectSchema = new Schema(
  {
    subjectName: {
      type: String,
      required: true,
    },
    // semester: {
    //   // 1 ,2 ,3 , 4
    //   type: Number,
    //   required: true,
    // },
    semester: {
      // Even /Odd
      type: Number,
      required: true,
    },
    currentYear: {
      // SE , TE , BE
      type: String,
      required: true,
    },
    // currentYear: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;
