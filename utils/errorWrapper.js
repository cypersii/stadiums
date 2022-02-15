module.exports=(fun)=>{
	return (req,res,next)=>{
		fun(req,res,next).catch(e=>next(e))
	}
}
// function wrapAsync(fn){
// 	return function(req,res,next) {
// 		fn(req,res,next).catch(e=>next(e))
// 	}
// }
