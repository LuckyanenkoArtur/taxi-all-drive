// # ------------------------------IMPORTS-------------------------------#
// Import Express.js and router
const router = require("express").Router();
const autocompletesControllers = require("../../../controllers/v-1-0-0/autocompletesControllers");
// # ---------------------------------------------------------------------#

// #--------------------------login router -----------------------------------#
router.get("/clients", autocompletesControllers.clients);
router.get("/vechels", autocompletesControllers.vechels);
router.get("/drivers", autocompletesControllers.drivers);
// #--------------------------------------------------------------------------#

module.exports = router;
