const express = require('express');
const bodyParser = require ('body-parser');
const app = express();
const cors = require('cors') //служит для обработики корс запросов,
// если даже клиент будет находиться на другом домене, то мы все равно сможем отвечать нашим сервером
const morgan = require('morgan');
// также он используется для того, что мы могли красиво логировать
// (смотреть, что происходит с сервером в данный момент)
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const PassportWithRoles = require('passport-with-roles')
mongoose.connect(keys.mongoURI)
    .then(() => console.log ('MongoDB connected'))
     .catch(error => console.log(error));
//данный метод коннект возвращается промис, у любого промиса есть метод then
// который будет вызван в том случае если у нас соединение с базой прошло успешно
const analyticsRoutes = require('./routes/analytics');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const productRoutes = require('./routes/product');
const controller = require("./controllers/category");
//ниже мы регистрируем данный роут с помощью нашего приложения app
// чтоб использовать данные роуты нам нужно воспользоваться нашим app
// у объекта app существуют различные свойтсва к примеру use
// который позволяет нам добавлять различные плагины или роуты
app.use(passport.initialize())
require('./middleware/passport')(passport)//данная конструкция вернет нам функцию,
// котрую мы сразу же и вызовем с помощью круглых скобоче

app.use(morgan('dev'))//мы говорим, что находимся сейчас в режиме разработки
//app.use(require ('morgan')('dev')) более лаконичный вариант записи где мы импортируем плагин
// и используем доступные в нем функции
app.use('/uploads', express.static('uploads'))//это даст нам возможность обращаться к картинкам на прямую
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
//мы обратились к методу urlencoded, который позволит нам инкидориовать некоторые url,
// которые приходят к нам, здесь мы также передаем объект конфигурации и
// его поле extended ставим в значение true
app.use(bodyParser.json()) // обращаемся к методу json() генерировать js obъекты полученные из json
// мы обращаемся к объкту app и с помощью метода use мы говорим о том,
// что используем какой-то плагин (bodyParser)



app.use('/api/analytics', analyticsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/product', productRoutes)
// тут мы даем название url (путь), а затем добавляем его значение authRoutes




module.exports = app