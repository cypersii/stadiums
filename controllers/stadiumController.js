const wrapAsync=require("../utils/errorWrapper");
const Soccer=require("../models/football");
const Review=require("../models/review");
const axios=require("axios");

const mbxGeocoding=require('@mapbox/mapbox-sdk/services/geocoding');
const Geocoder=mbxGeocoding({accessToken:process.env.MAPBOX_TOKEN});

module.exports.stadiumHome=wrapAsync(async (req,res)=>{
	const data=await Soccer.find({});
	const geoData=await JSON.stringify(data.map(x=>x.property));
	// console.log(geoData)
	res.render("home.ejs",{data,geoData});
});

module.exports.stadiumNew=wrapAsync(async(req,res)=>{
	res.render("new")
})

module.exports.stadiumEdit=wrapAsync(async (req,res)=>{
	const data=await Soccer.findById(req.params.id);
	res.render("edit",{data})
});

module.exports.stadiumView=wrapAsync(async (req,res,next)=>{
	const {id}=req.params;
	const data=await Soccer.findById(id).populate({path:"Review",populate:{path:"user"}}).populate("Owner");
	const image=await axios.get("https://api.unsplash.com/photos/random?query=football-stadium&client_id=WObs9LMAiVyuOh7RZjbEblyD6BlzKWlBdc8P93CcXAc&collections=9920102");
	res.render("view",{data,url:image.data.urls})
});

module.exports.stadiumNew_post=wrapAsync(async (req,res)=>{
	req.flash("success","successfully created");
	const data=await Geocoder.forwardGeocode({
		query:`${req.body.City},${req.body.Country}`,
		limit:1
	}).send()
	console.log(data.body)
	const {coordinates}=data.body.features[0].geometry;
	const newStadium=await new Soccer({...req.body,Owner:req.user._id,Latitude:coordinates[0],Longitude:coordinates[1]});
	newStadium.geometry=data.body.features[0].geometry;
	const {_id}=newStadium;
	await newStadium.save();
	res.redirect(`/stadiums/${_id}`)
});

module.exports.stadiumEdit_put=wrapAsync(async (req,res)=>{
	req.flash("success","SUCCESSFULLY UPDATED")
	const {id}=req.params;
	const updateStadium=await Soccer.findByIdAndUpdate(id,req.body);
	res.redirect(`/stadiums/${id}`)
});

module.exports.stadiumDelete=wrapAsync(async (req,res)=>{
	req.flash("success","successfully deleted")
	const {id}=req.params;
	const deleteStadium=await Soccer.findByIdAndDelete(id);
	res.redirect("/stadiums")
});
