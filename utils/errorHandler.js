module.exports = (res, error) =>{
    res.status(500) //обычная серверная ошибка
        .json({
            success: false,
            message: error.message ? error.message: error//проверяем есть ли ишибка, если есть поле месседж у ошибки,
            // то показываем его, если нет, то саму ошибку
        })
}