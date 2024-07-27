// # ------------------------------IMPORTS-------------------------------#
// Import Express.js and router
const router = require("express").Router();
const userprofileControllers = require("../../../controllers/v-1-0-0/userprofileControllers");
// # ---------------------------------------------------------------------#

// #--------------------------login router -----------------------------------#
router.get("/", userprofileControllers.getUserprofileInformation);
router.post("/delete-user", userprofileControllers.deleteUserProfile);
// #--------------------------------------------------------------------------#

module.exports = router;
