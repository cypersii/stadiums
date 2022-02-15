const User=require("../models/user");

module.exports.registerGet=async (req,res)=>{
	res.render("user/register");
}

module.exports.registerPost=async(req,res)=>{
	try{
		const {username,email,password}=req.body;
		const user=await new User({username,email});
		const data=await User.register(user,password);
		req.login(data,err=>{
			err?next(err):res.redirect("/stadiums")
		})
	}catch(e){
		req.flash("error",e.message);
		res.redirect("/stadiums/register")
	}
};

module.exports.loginGet=(req,res)=>{
	res.render("user/login")
}

module.exports.loginPost=async (req,res)=>{
	req.flash("success","Welcome Back")
	const originalPath=req.session.originalPath || '/home';
	delete req.session.originalPath;
	res.redirect(originalPath)
};

module.exports.logout=(req,res)=>{
	req.logout();
	req.flash("success","Goodbye")
	res.redirect("/home")
}