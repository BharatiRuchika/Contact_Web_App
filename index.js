var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cloudinary = require("cloudinary");

const fileUpload = require('express-fileupload')
const cors = require('cors');
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: './config/config.env' })

var app = express();
app.use(cors());
const connectDatabase = require("./config/database");
connectDatabase.connect();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));
const errorMiddleware = require('./middlewares/errors')
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const corsOptions = {
  origin: true,
  credentials: true,
};
app.options("*" , cors(corsOptions));
app.use(cors(corsOptions));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(errorMiddleware);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// cloudinary requirements
cloudinary.config({
  cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
  api_key : process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET  
})

//twilio requirements
if(process.env.NODE_ENV==="production"){
  const path = require("path");
  app.use(express.static(path.join(__dirname,"client/build")));
  app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'client','build','index.html'))
})
}



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(process.env.PORT || 3001, () => console.log(`server started at ${process.env.PORT}`));
module.exports = app;
