const mongoose=require("mongoose");
const User=require("./user");

// mongoose.connect("mongodb://localhost:27017/Football");

const reviewSchema=new mongoose.Schema({
	review:{
		type:String,
		required:true
	},
	user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
	rating:{
		type:Number,
		required:true
	}
})

module.exports= mongoose.model("Review",reviewSchema);
