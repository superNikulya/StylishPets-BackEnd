const express = require('express')
const router = express.Router()
const controller = require ('../controllers/order')
const passport = require("passport");
router.post ('/login', passport.authenticate('jwt', {session: false   }), controller.create )
router.get ('/',passport.authenticate('jwt', {session: false   }), controller.getAll )
module.exports = router
// чтоб зарегестрировать какой-либо роут,  мы переход в файл app.js