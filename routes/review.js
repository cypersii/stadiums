const express=require("express");
const router=express.Router();
const isLogedin=require("../utils/isLogedIn");

const controller=require("../controllers/reviewController")

router.post("/:id/review",isLogedin,controller.reviewPost)

router.delete("/:s_id/review/:id/delete",isLogedin,controller.reviewDelete)

module.exports=router;