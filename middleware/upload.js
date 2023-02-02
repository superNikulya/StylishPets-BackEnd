//пакеты которые позволят нам рабоать с загрузкой файлов
const multer = require('multer');
const moment = require('moment');
const storage = multer.diskStorage({
    destination(req,file, cb){
      cb(null, 'uploads/') //первым параметром мы указываем, что у нас нет никаких огибок поэтому мы передаем null
        //вторым параметром мы указываем путь до той папки куда мы хотим складывать все наши изображения
    },
    filename(req,file, cb){
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb (null, `${date}-${file.originalname}`) //вторым будет название файла, который будет добавляться в папку апдлоадс
          }
})
const fileFilter = (req, file, cb)=>{ //проверяем какой файл к нам загружается
    if(file.mimetype=== 'image/png/'|| file.mimetype==='image/jpeg'|| file.mimetype==='image/webp'){//Если файл картинка, то мы его пропускаем, если нет то выдаем ошибку
      cb (null, true)
    }else{
       cb (null, false)
    }
}
const limits = {
    fileSize: 1024*1024*5
}
module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
})
// именно тут мы создадим объект, который позволит нам удобно загружать какие либо файлы,
// а после мы его экспортируем так, где нам нужно будет его рименить