const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { checkToken } = require("../middleware/token_validation");

//login and then render home
//login added
router.get("/login", authController.login_get);
//router login added
router.post("/login", authController.login_post);
//view all users
router.get("/login/viewAllUsers",  authController.getAllUsersView_get);

//add user
router.get("/login/adduser", authController.adduser_get);
router.post("/login/adduser", authController.adduser_post);

//edit
router.get("/login/editUser/:id", authController.getUserByUserId_get);
//update
router.post("/login/editUser/:id", authController.getUserByUserId_post);

//view user
router.get("/login/viewuser/:id", authController.veiwuser_get);

//add-no
router.get("/login/view-user/add-no/:id", authController.addno_get);
router.post("/login/view-user/add-no/:id", authController.addno_post);
router.get("/login/view-user/calc-res/:id", authController.performOperations_get);

//delete
router.delete("/:id", authController.deleteUserPermanent);
module.exports = router;
