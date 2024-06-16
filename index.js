const express = require("express");
const axios = require('axios');
const passport = require('passport');
const session = require('express-session');
const app = express();
const {dbConnect} = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken');
require('./utlis/passportSetup');
const dotenv = require("dotenv");




// Setting up port number
const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
dotenv.config();

// Connecting to database
dbConnect();
 
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

app.use(session({
	secret: 'your-session-secret',
	resave: false,
	saveUninitialized: true
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());



// JWT Token generation function
const generateToken = (user) => {
	return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  };
  
  // Google Auth Routes
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
  app.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
	const token = generateToken(req.user);
	res.status(200).json({ success:true,message:"logged in",token });
  });
  
  // Facebook Auth Routes
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
  
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
	const token = generateToken(req.user);
	res.status(200).json({ success:true,message:"logged in",token });
  });



const authRoutes = require("./routes/Auth");
app.use("/apiv1/auth",authRoutes);

app.get('/', (req, res) => {
	res.send('<h1>Home Page</h1><a href="/auth/google">Login with Google</a><br><a href="/auth/facebook">Login with Facebook</a>');
  });


app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});




