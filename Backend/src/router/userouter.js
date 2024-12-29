const express = require("express")
const router = express.Router()
const userRoute = require("./../controller/usercontroller")
const productRoute= require("../controller/productcontroller")
const authenticateUser = require("./../Middleware/auth")



router.post("/register",userRoute.signuppost)
router.post("/login",userRoute.loginpost)
router.post("/products",authenticateUser,productRoute.productpost)
// router.get("/products",authenticateUser,productRoute.productget )


module.exports = router