const JWT = require("jsonwebtoken");
const createError = require("../utils/error");
const Student = require("../Schema/Student");
const Faculty = require("../Schema/Faculty");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  // console.log(token);

  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }
  try {
    const decodedJwtPayload = JWT.verify(token, process.env.JWT_SECRET);
    // console.log("===>>", decodedJwtPayload.id);
    req.user = await Student.findById(decodedJwtPayload.id, "name email role");
    // console.log(req.user);
    next();
  } catch (error) {
    return next(createError(401, "You are not authenticated"));
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    await verifyToken(req, res, async () => {
      // if (req.user.isAdmin) {
      //   console.log(req.user);
      //   console.log("You are admin");
      //   next();
      // } else {
      //   console.log("You are not an authentic User");
      //   return next(createError(403, "You are not authorized"));
      // }
      console.log(req.user);
    });
  } catch (error) {
    next(error);
  }
};

const checkFaculty = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    // console.log(token);

    if (!token) {
      return next(createError(401, "You are not authenticated"));
    }

    try {
      const decodedJwtPayload = JWT.verify(token, process.env.JWT_SECRET);
      // console.log("===>>", decodedJwtPayload.id);
      req.user = await Faculty.findById(
        decodedJwtPayload.id,
        "name email role"
      );
      // console.log(req.user);

      if (
        req.user &&
        (req.user.role === "Faculty" || req.user.role === "Admin")
      ) {
        console.log("You are Faculty");
        next();
      } else {
        console.log("You are not an authentic User");
        return next(createError(403, "You are not authorized"));
      }
    } catch (error) {
      return next(createError(401, "You are not authenticated"));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { verifyToken, checkAdmin, checkFaculty };

// import jwt from "jsonwebtoken"

// import { createError } from "../error.js"

// export  const verifyToken = (req,res,next)=>{
//     const token = req.cookies.access_token   //user or admin ke cookies main acess token present hoga
//     console.log("token: " , token);
//     if(!token){

//         return next(createError(401 , "You are not authenticated"))
//     }
//     jwt.verify(token, process.env.JWT , (err , user)=>{
//         if(err)
//         return next(createError(403 , "invalid token"))
//         req.user = user ;   //inserted the user into req.user
//         next();

//     })
// }
// export const checkUser = (req, res, next) => {
//   verifyToken(req, res, next, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin)
//       //this will check data from the login user
//       next();
//     else {
//       return next(createError(403, "You are not authorized"));
//     }
//   });
// };

// //checking admin authentication :: remember this will check from the user-login data itself
