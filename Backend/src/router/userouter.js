const express = require("express")
const router = express.Router()
const userRoute = require("./../controller/usercontroller")




router.post("/register",userRoute.signuppost)


module.exports = router