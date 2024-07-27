// # ------------------------------IMPORTS-------------------------------#
// Import Express.js and router
const router = require("express").Router();
const registController = require("../../../controllers/v-1-0-0/registrationControllers");
// # ---------------------------------------------------------------------#

// #--------------------------login router -----------------------------------#
router.post("/", registController.registNewUser);
// #--------------------------------------------------------------------------#

module.exports = router;
