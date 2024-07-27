// # ------------------------------IMPORTS-------------------------------#
// Import Express.js and router
const router = require("express").Router();
const veichelsControllers = require("../../../controllers/v-1-0-0/veichelsControllers");
// # ---------------------------------------------------------------------#

// #--------------------------login router -----------------------------------#
router.get("/all", veichelsControllers.getAllVeichels);
router.post("/add-veichel", veichelsControllers.addVeichel);
router.post("/edit-veichel", veichelsControllers.editVeichel);
router.post("/delete-veichel", veichelsControllers.deleteVeichel);
// router.post("/details", clientsControllers.getDetailedEventInfo);
// #--------------------------------------------------------------------------#

module.exports = router;
