const Students = require("../Schema/Student.js");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createStudent = async (req, res, next) => {
  try {
    // user  has created and data passed to the models
    console.log(req.body.name, req.body.email, req.body.password);
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash }); // ading value to the schema

    await newUser.save();
    res.status(200).send("user created sucessfully!!");
    console.log("user created sucessfully");
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    // findone is the method of mongodb
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!!"));
    const pass = await bcrypt.compare(req.body.password, user.password); // true
    if (!pass) return next(createError(400, "Wrong Credentials"));
    else console.log("user loggedIn sucesfully!!");
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails });
    console.log(token);
  } catch (error) {
    next(error);
  }
};
const deleteStudent = async (req, res, next) => {
  try {
    // findone is the method of mongodb
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!!"));
    const pass = await bcrypt.compare(req.body.password, user.password); // true
    if (!pass) return next(createError(400, "Wrong Credentials"));
    else console.log("user loggedIn sucesfully!!");
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails });
    console.log(token);
  } catch (error) {
    next(error);
  }
};

// Export both functions as an object
module.exports = {
  createStudent,
  updateStudent,
  deleteStudent,
};
