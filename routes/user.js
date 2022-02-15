const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/errorWrapper");
const passport=require("passport");

const controller=require("../controllers/userController");

router.get("/register",controller.registerGet);

router.post("/register",wrapAsync(controller.registerPost));

router.get("/login",controller.loginGet)

router.post("/login",passport.authenticate('local',{failureFlash:true,failureRedirect:'login'}),controller.loginPost)

router.get("/logout",controller.logout)

module.exports=router;