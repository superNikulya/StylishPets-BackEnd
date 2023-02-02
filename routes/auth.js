//данные роуты отвечают за авторизацию и регистрацию
const express = require('express')
//используем функцию, которая есть в экспрессе, для создания роутов (ниже)
const router = express.Router() //создаем здесь локальный роутер
//теперь мы можем добавлять роуты и выполнять какую-то логику, к примеру:
    //localhost:5000/api/login-page/login
const controller = require ('../controllers/auth')
//localhost:3000/api/login-page/login
router.post ('/login', controller.login ) //( тут мы добавили прослушку пост запросов по адресу выше)
// мы не используем в данном случае колбэк функцию req res а используем метод логин конртоллера,
// к тому же мы не вызываем функцию логин, а просто передаем её
// данная функ будет вызвана только в случае, если мы попадем по адрессу localhost:5000/api/login-page/login
//localhost:3000/api/login-page/register
router.post ('/register', controller.register )
module.exports = router
// чтоб зарегестрировать какой-либо роут,  мы переход в файл app.js