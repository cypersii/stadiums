const express=require("express");
const router=express.Router();
const {serverSchema}=require("../server_validations/serverSchema");
const passport=require('passport');
const isLogedIn=require("../utils/isLogedIn");
const isAuthor=require("../utils/isAuthorized")

const controller=require("../controllers/stadiumController");

router.get("/",controller.stadiumHome)

router.get("/new",isLogedIn,controller.stadiumNew)

router.get("/:id/edit",isLogedIn,isAuthor,controller.stadiumEdit)

router.get("/:id",controller.stadiumView)

router.post("/new",isLogedIn,serverSchema,controller.stadiumNew_post)

router.put("/:id/edit",isLogedIn,isAuthor,controller.stadiumEdit_put)

router.delete("/:id",isLogedIn,isAuthor,controller.stadiumDelete)

module.exports=router;
