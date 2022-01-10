const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { checkToken } = require("../middleware/token_validation");

//login and then render home
//login added
router.get("/", authController.login_get);
router.post("/", authController.login_post);
//view all users
router.get("/viewAllUsers", authController.getAllUsersView_get);

//add user
router.get("/adduser", authController.adduser_get);
router.post("/adduser", authController.adduser_post);

//edit
router.get("/editUser/:id", authController.getUserByUserId_get);
//update
router.post("/editUser/:id", authController.getUserByUserId_post);

//view user
router.get("/viewuser/:id", authController.veiwuser_get);

//add-no
router.get("/view-user/add-no/:id", authController.addno_get);
router.post("/view-user/add-no/:id", authController.addno_post);
router.get("/view-user/calc-res/:id", authController.performOperations_get);

//delete
router.delete("/:id", authController.deleteUserPermanent);
module.exports = router;
