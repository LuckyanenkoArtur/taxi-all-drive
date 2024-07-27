// # ------------------------------IMPORTS-------------------------------#
// Import Express.js and router
const router = require("express").Router();
const clientsControllers = require("../../../controllers/v-1-0-0/clientsControllers");
// # ---------------------------------------------------------------------#

// #--------------------------login router -----------------------------------#
router.get("/all", clientsControllers.getAllClients);
router.post("/add-client", clientsControllers.addClient);
router.post("/edit-client", clientsControllers.editClient);
router.post("/delete-client", clientsControllers.deleteClient);
// router.post("/details", clientsControllers.getDetailedEventInfo);
// #--------------------------------------------------------------------------#

module.exports = router;
