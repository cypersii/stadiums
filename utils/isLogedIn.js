module.exports=(req,res,next)=>{
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You must login in first");
	req.session.originalPath=req.originalUrl;
	res.redirect("/stadiums/login")
};
