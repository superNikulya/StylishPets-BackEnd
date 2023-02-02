const express = require('express')
const router = express.Router()
const controller = require ('../controllers/anaiytics')
router.get ('/overview', controller.overview)
router.post ('/analytics', controller.analytics )
module.exports = router
// чтоб зарегестрировать какой-либо роут,  мы переход в файл app.js