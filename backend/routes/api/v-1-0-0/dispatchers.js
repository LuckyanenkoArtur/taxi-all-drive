// # ------------------------------IMPORTS-------------------------------#
// Import Express.js and router
const router = require("express").Router();
const dispatchersControllers = require("../../../controllers/v-1-0-0/dispatchersControllers");
// # ---------------------------------------------------------------------#

// #--------------------------login router -----------------------------------#
router.get("/all", dispatchersControllers.getDispatchers);
router.post("/add-dispatcher", dispatchersControllers.addDispatcher);
router.post("/edit-dispatcher", dispatchersControllers.editDispatcher);
router.post("/delete-dispatcher", dispatchersControllers.deleteDispatcher);
// router.post("/details", clientsControllers.getDetailedEventInfo);
// #--------------------------------------------------------------------------#

module.exports = router;
