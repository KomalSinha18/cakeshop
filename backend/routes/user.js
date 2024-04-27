const express = require("express")
const { register, login, logout, myProfile, allUsers, userProfile, myCarts, myOrders } = require("../controllers/user")
const { isAuthneticated } = require("../middlewares/auth")



const router = express.Router()

router.route("/user/register").post(register)

router.route("/user/login").post(login)

// router.route("/user/cart").post(isAuthneticated,addToCart)
router.route("/user/logout").get(logout)

router.route("/user/me").get(isAuthneticated,myProfile)

router.route("/user/all").get(isAuthneticated,allUsers)


router.route("/user/mycart").get(isAuthneticated,myCarts)

router.route("/user/myorder").get(isAuthneticated,myOrders)


router.route("/user/:id").get(isAuthneticated,userProfile)




module.exports = router
