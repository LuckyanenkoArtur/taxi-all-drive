// # ------------------------------IMPORTS-------------------------------#
// Import Express.js and router
const router = require("express").Router();
const ordersControllers = require("../../../controllers/v-1-0-0/ordersControllers");
// # ---------------------------------------------------------------------#

// #--------------------------login router -----------------------------------#
router.get("/all", ordersControllers.getOrders);
router.post("/add-order", ordersControllers.addOrder);
router.post("/edit-order", ordersControllers.editOrder);
router.post("/delete-order", ordersControllers.deleteOrder);
// #--------------------------------------------------------------------------#

module.exports = router;
