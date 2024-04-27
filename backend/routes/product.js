const express = require("express")
const { isAuthneticated } = require("../middlewares/auth")
const { addProduct, allProducts, myProduct, addToCart, removeFromCart } = require("../controllers/product")


const router = express.Router()

router.route("/product/add").post(addProduct)

router.route("/product/all").get(allProducts)

router.route("/product/addtocart/:id").get(isAuthneticated,addToCart)

router.route("/product/removefromcart/:id").get(isAuthneticated,removeFromCart)

router.route("/product/:id").get(myProduct)

module.exports = router