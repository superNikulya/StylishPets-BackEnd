const express = require('express');
const controller = require ('../controllers/category');
const upload = require('../middleware/upload')
const passport = require ('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const router = express.Router();
router.get('/', controller.getAll )
router.get ('/:id',passport.authenticate('jwt', {session:false  }), controller.getById )
//чтоб указать, что мы ожидаем еще какой-то параметр мы должны поставить : и дальше нужный нам парметр
router.delete ('/:id',passport.authenticate('jwt', {session:false   }), controller.remove )
router.post ('/',passport.authenticate('jwt', {session: false   }),  upload.single('image') , controller.create )
router.patch ('/:id', passport.authenticate('jwt', {session: false   }), upload.single('image'), controller.update)

module.exports = router
// чтоб зарегестрировать какой-либо роут,  мы переход в файл app.js