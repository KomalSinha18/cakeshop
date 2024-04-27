const express = require("express")
const { isAuthneticated } = require("../middlewares/auth")
const { orderPlaced, allorders, myOrder, deleteOrder } = require("../controllers/order")


const router = express.Router()

router.route("/order/placed").post(isAuthneticated,orderPlaced)

router.route("/order/all").get(isAuthneticated,allorders)

router.route("/order/myorders").get(isAuthneticated,myOrder)

router.route("/order/:id").delete(isAuthneticated,deleteOrder)

module.exports = router