if(process.env.NODE_ENV!=="production"){
	require('dotenv').config();
}

const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const ejsMate=require('ejs-mate');
const override=require('method-override');
const session=require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user');
const Apperoor=require("./utils/errorClass");
const mongoSanitize = require('express-mongo-sanitize');
const helmet=require('helmet');
const MongoDbStore=require("connect-mongo");


const dbUrl=process.env.DB_URL || 'mongodb://localhost:27017/Football';
const secret=process.env.SECRET || 'notagoodsecret';

mongoose.connect(dbUrl,{
	useNewUrlParser:true,
	useUnifiedTopology:true,
})
	.then(()=>{
		console.log('Database connected')
	})
	.catch((e)=>{
		console.log(e)
		console.log('MONGO CONNECTION UNSUCESSFULL')
	})

const stadiumRoutes=require('./routes/stadium');
const reviewRoutes=require('./routes/review');
const userRoutes=require('./routes/user')

const app=express();
app.use(express.static('Public'));
app.use(express.urlencoded({extended:true}));
app.use(override('_method'));

const store= new MongoDbStore({
	mongoUrl:dbUrl,
	secret:secret,
	touchAfter:24 * 60 * 60
})

store.on("error",function(e){
	console.log("SESSION STORE ERROR",e)
})

const sessionConfig={
	store:store,
	name:'manish',
	secret:secret,
	resave:false,
	saveUninitialized:true,
	cookie:{
		httpOnly:true,
		expires:1000 * 3600 * 24 * 7
	}
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use(mongoSanitize());
// app.use(helmet({contentSecurityPolicy:false}))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()))

app.use((req,res,next)=>{
	res.locals.msg=req.flash('success');
	res.locals.error=req.flash('error');
	res.locals.currentUser=req.user;
	next()
})

app.use('/stadiums',userRoutes);
app.use('/stadiums',stadiumRoutes);
app.use('/stadiums',reviewRoutes);


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.engine('ejs',ejsMate);

app.get('/home',(req,res)=>{
	res.render('main')
})

app.get('*',async(req,res,next)=>{
	next(new Apperoor("404","Invalid Request"));
})

app.use((err,req,res,next)=>{
	const {status=400,msg='new error'}=err
	res.render('error',{error:err})
})

const port=process.env.PORT || '3000';

app.listen(port,()=>{
	console.log(`SERVER IS LISTINING ON PORT :${port}`)
})

