const express = require("express");
const userController = require("../controllers/userController");
const { protect } = require("../middleware/protect");

const Router = express.Router();

Router.route("/register").post(userController.register);
Router.route("/login").post(userController.login);
Router.route("/update-user").put(protect, userController.updateUser);

module.exports = Router;
