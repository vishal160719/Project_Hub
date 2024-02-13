const { Router } = require("express");
const authRoutes = require("./auth.js");
// const studentsRoutes = require("./student.js");
const projectsRoutes = require("./projects.js");
const subjectRoutes = require("./subject.js");
const facultyRoutes = require("./facultyAuth.js");
const groupRoutes = require("./group.routes.js");
const projectIdeaRoutes = require("./projectIdea.routes.js");

const router = Router();
router.use("/auth", authRoutes);
router.use("/admin/auth", facultyRoutes);
// router.use("/students", studentsRoutes);
router.use("/project", projectsRoutes);
router.use("/subject", subjectRoutes);
router.use("/group", groupRoutes);
router.use("/projectIdea", projectIdeaRoutes);

module.exports = router;
