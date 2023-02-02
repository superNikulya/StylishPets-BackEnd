const bcrypt =require('bcryptjs');
const User = require ('../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler')
module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})
    if (candidate) {
        //проверка пароля, пользователь сущетсвует
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        //пароль, который вводит пользователь и не захеширован будет первым, второй это захешированный пароль
        // который хранится в кандидате
        if (passwordResult) {
            //если тру, то генерируем токен, в случае совпадение паролей
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id,
                role: candidate.role,
            }, keys.jwt, {expiresIn: 60 * 60})

            //выше первым мы передали объект, который хотели зашифровать в токене, а вторым
            // парметром секретный ключ,  а третим - объект, который бдует содежать в себе время жизни токена
            res.status(200).json({
                token: `Bearer ${token}`//данная строчка в обратных ковычках для того
                // чтоб на клиента пришел нужный формат
            })
        } else {
            res.status(401).json({
                message: 'Пароли не совпадают.Повторите попытку.'
            })
        }
    } else {
        //пользователя нет - ошибка
        res.status(404).json({
        message: 'Пользователь с таким email не найден'
        })
    }
}
// строка email: req.body.email для того чтоб получить доступ к пользоват данным
// мы обращаемся к объекту req к полю body и дальше к названию переменных к которым мы хотим получить доступ
//req хранит в себе все те данные, которые отправляет пользователь


module.exports.register = async function(req, res) {
    const candidate = await User.findOne({
    email: req.body.email  //  Сравниваем поле имел в базе данных с полем, которое вводит клиент
         })

    if(candidate){
        //пользователь существует и нужно отдать ошибку
        res.status(409).json({
            message:'Пользователь с таким email уже существует.'
        })
    }
        else {
        const salt = await bcrypt.genSaltSync(10)
        const password = await req.body.password
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            console.error(res, e)
        }
    }
    }