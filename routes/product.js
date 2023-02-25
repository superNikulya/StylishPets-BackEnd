const express = require('express')
const router = express.Router()
const controller = require ('../controllers/product')
const passport = require("passport");
const upload = require("../middleware/upload");

router.get ('/', controller.getAllProducts )
router.get ('/category/:category', controller.getByCategoryId )
router.get ('/:id', controller.getById)
router.post ('/',passport.authenticate('jwt', {session: false   }),  upload.single('image'), controller.create)
router.patch ('/:id',passport.authenticate('jwt', {session: false   }),  upload.single('image'), controller.update )
router.delete ('/:id',passport.authenticate('jwt', {session: false   }), upload.single('image'), controller.remove )

module.exports = router