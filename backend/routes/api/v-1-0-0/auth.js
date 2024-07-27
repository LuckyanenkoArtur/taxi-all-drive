// # ------------------------------IMPORTS-------------------------------#
// Import Express.js and router
const router = require("express").Router();
const authController = require("../../../controllers/v-1-0-0/authControlers");
// # ---------------------------------------------------------------------#

// #--------------------------login router -----------------------------------#
router.post("/login", authController.login);
// #--------------------------------------------------------------------------#

// #-------------------------logout router -----------------------------------#
router.post("/logout", authController.logout);
// #--------------------------------------------------------------- ----------#

module.exports = router;
