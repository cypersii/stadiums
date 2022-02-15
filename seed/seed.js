const mongoose=require("mongoose");
const Soccer=require("../models/football");
const data=require("./parsedData");

const mbxGeocoding=require('@mapbox/mapbox-sdk/services/geocoding');
const Geocoder=mbxGeocoding({accessToken:'pk.eyJ1IjoiY3kwMHIiLCJhIjoiY2t6aHhlemRtMDI3bjJwcGY4NWxqbjZkbCJ9.8_y-VpujC7Re27pMxtbQjQ'});

const seed=async ()=>{
	await Soccer.deleteMany({})
	const allStadiums=await Soccer.insertMany(data)
	// await Soccer.updateMany({},{Owner:"6201e8bf340a4f3195d95e83"});
	const stadiums=await Soccer.find({});
		for(let scr of stadiums){
			const data=await Geocoder.reverseGeocode({
				query:[scr.Longitude,scr.Latitude],
				limit:1
			}).send();
			const stadium=await Soccer.findById(scr._id);
			stadium.Owner="6201e8bf340a4f3195d95e83";
			stadium.geometry=data.body.features[0].geometry;
			await stadium.save()
		}
}
seed().then(()=>{
	mongoose.connection.close()
})
