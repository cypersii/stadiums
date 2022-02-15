const Joi=require("joi");

stadiumSchema=Joi.object({
	Team:Joi.string().required(),
	City:Joi.string().required(),
	Country:Joi.string().required(),
	Stadium:Joi.string().required(),
	Capacity:Joi.number().required()
}).required()

module.exports.serverSchema=(async (req,res,next)=>{
	const result=stadiumSchema.validate(req.body);
	if(result.error){
		next(result.error)
	}next()
})