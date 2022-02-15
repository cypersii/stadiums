const Review=require("../models/review");
const Soccer=require("../models/football");

module.exports.reviewPost=async (req,res)=>{
	const {id}=req.params;
	const reviewData=await new Review(req.body);
	reviewData.user=req.user;
	const stadium=await Soccer.findById(id);
	stadium.Review.push(reviewData)
	await stadium.save()
	await reviewData.save()
	res.redirect(`/stadiums/${id}`)
}

module.exports.reviewDelete=async (req,res)=>{
	const {s_id,id}=req.params;
	await Review.findByIdAndDelete(id);
	res.redirect(`/stadiums/${s_id}`)
}