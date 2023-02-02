const Order = require('../models/Order')
const errorHandler = require ('../utils/errorHandler')
 module.exports.getAll = async function (req, res) { //здесь нам нужно получить список всех наштх заказов,
     // мы будет также иметь возможность филтровать
     // номера заказов и добавлять временные границы заказов, дату от и до
     const query = {
         user: req.user.id
     }
     //ниже поле Дата старта
     if(req.query.start) {
     query.date = {
         $gte: req.query.start //>=больше или меньше, в этом условии мы проверили дату старта
     }
     }
     if(req.query.end) {
         if (!query.date) {
             query.date = {}
         }
         query.date ['$lte'] = req.query.end
     }//меньше или равно
         //мы хотим полкчить все заказы у которых дата  меньше либо равна той дате,
         // которую мы обозначили в кажестве конца
         if(req.query.order) {
             query.order = +req.body.order //мы кладем в квери ордер значение из реквест боди ордер
         }
         try {
             const orders = await Order
         .find (query)
         .sort ({date: -1})
         .skip (+req.query.offset)//locallost:300/api/order(get)?offset=2&limit=5 означает,что отступ 2
         .limit(+req.body.limit)
         // (Сколько элементов нам нужно пропустить )
         // а количество забраных элементов 5
         // что мы заюираем каких-то 5 элементов
             res.status(200).json(orders)
     } catch (e) {
         errorHandler(res, e)
     }
}
module.exports.create = async function (req, res) {
    try {
        const lastOrder = await Order
            .findOne({user: req.userId})
            .sort({date: - 1}) //из базы данных мы достали даты и
        // в последней строке определили какой заказ был последним
        const maxOrder = lastOrder ? lastOrder.order : 0  //мы проверяем есть ли что-то в ласт ордер если да,
        // то вытаскиваем от туда поле ордер
        const order = await new Order ({
            list: req.body.list,
            user: req.user.id,
            order: maxOrder + 1
        }).save()
        res.status(201).json(order)
    } catch (e) {
        errorHandler(res, e)
    }
}