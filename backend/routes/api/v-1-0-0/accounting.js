const router = require("express").Router();
const accountingControllers = require("../../../controllers/v-1-0-0/accountingControllers");

// #--------------------------login router -----------------------------------#
router.post("/show-ticket", accountingControllers.showTicket);
// #--------------------------------------------------------------------------#

// #-------------------------logout router -----------------------------------#
router.post("/all-brought-tickets", accountingControllers.allBroughtTickets);
// #--------------------------------------------------------------- ----------#

// #-------------------------logout router -----------------------------------#
router.post(
  "/return-brought-ticket",
  accountingControllers.returnBroughtTicket
);
// #--------------------------------------------------------------- ----------#

// #-------------------------logout router -----------------------------------#
router.post("/buy-ticket", accountingControllers.buyTicket);
// #--------------------------------------------------------------- ----------#

module.exports = router;
