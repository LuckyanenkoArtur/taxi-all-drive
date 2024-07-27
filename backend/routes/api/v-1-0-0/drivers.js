// # ------------------------------IMPORTS-------------------------------#
// Import Express.js and router
const router = require("express").Router();
const driversControllers = require("../../../controllers/v-1-0-0/drviersControllers");
// # ---------------------------------------------------------------------#

// #--------------------------login router -----------------------------------#
router.get("/all", driversControllers.getAllDrivers);
router.post("/add-driver", driversControllers.addDriver);
router.post("/edit-driver", driversControllers.editDriver);
router.post("/delete-driver", driversControllers.deleteDriver);
// router.post("/details", clientsControllers.getDetailedEventInfo);
// #--------------------------------------------------------------------------#

module.exports = router;
