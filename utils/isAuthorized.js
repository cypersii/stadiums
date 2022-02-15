const Soccer=require("../models/football");

module.exports=async(req,res,next)=>{
	const {id}=req.params;
	const user=await Soccer.findById(id);
	if(!req.user.equals(user.Owner)){
		req.flash("error","You Are Not Authorized");
		return res.redirect('/stadiums')
	}
	next()
}