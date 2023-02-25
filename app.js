const express = require('express');
const bodyParser = require ('body-parser');
const app = express();
const cors = require('cors')
//serves to process cors-requests
//even if the client is in a different domain we will be able to respond with our server
const morgan = require('morgan');
// morgan is using for logging, if we need to see what is going on here (on our server:)
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
mongoose.connect(keys.mongoURI)
    .then(() => console.log ('MongoDB connected'))
     .catch(error => console.log(error));
//these method returns a promise, and all promises
// have method "then" and in this case it will be called
// if we connect to database correctly
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const controller = require("./controllers/category");


app.use(passport.initialize())
require('./middleware/passport')(passport)
//this structure will return a function that we will immediately call by using ()


app.use(morgan('dev'))//мы говорим, что находимся сейчас в режиме разработки
//app.use(require ('morgan')('dev')) более лаконичный вариант записи где мы импортируем плагин
// и используем доступные в нем функции
app.use('/uploads', express.static('uploads'))//это даст нам возможность обращаться к картинкам на прямую
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
//we call urlencoded method which allows us to encode some urls
//which are coming to us, there we also pass a configuration object
// and "extended" the field and set its value like "true"
app.use(bodyParser.json())
//call the app object by using method "use" let to know
// that we are using some plugin (bodyParser)
// call the json() method to generate js objects obtained from json


app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoutes)
//we give a name for urls and then return its value to (auth/product...)Routes


module.exports = app