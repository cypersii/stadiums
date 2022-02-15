const mongoose=require("mongoose");
const Review=require("./review");
const User=require("./user")

// mongoose.connect("mongodb://localhost:27017/Football")
	
const footballSchema=new mongoose.Schema({
	Team:{
		type:String,
		required:true
	},
	City:{
		type:String,
		required:true
	},
	Stadium:{
		type:String,
		required:true
	},
	Capacity:{
		type:String,
		required:true
	},
	Country:{
		type:String,
		required:true
	},
	Review:[{type:mongoose.Schema.Types.ObjectId,ref:"Review"}],
	Owner:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User"
	},
	Latitude:Number,
	Longitude:Number,
	geometry:{
		type:{
			type:String,
			enum:['Point'],
			// required:true
		},
		coordinates:{
			type:[Number],
			// required:true
		}
	}
})

footballSchema.post("findOneAndDelete",async (data)=>{
	if(data.Review.length){
		await Review.deleteMany({_id:{$in:data.Review}})
	}
})

footballSchema.virtual("property").get(function(){
	return {properties:{popupName:this.Stadium,popupCapacity:this.Capacity,popupLink:`stadiums/${this._id}`},
		geometry:this.geometry}
})

module.exports=mongoose.model("Soccer",footballSchema);


