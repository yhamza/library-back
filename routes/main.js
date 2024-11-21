const {signup} = require("../services/sign");
const {login} = require("../services/login");
const asyncHandler = require('express-async-handler');


const router=require('express').Router()



//sign up
router.post('/api/signup',signup)
//sign in
router.post('/api/login',login)





//crud book
const book=require('../services/Book')


//create book
router.post('/api/createbook',book.createOne);
//delete byId
router.post('/api/deleteone/:id',book.deleteById);
//updatebyId
router.post('/api/updateone/:id',book.updateById);
//find all
router.get('/api/findAll',book.findAll)











const reservation=require('../services/Reservation')

//create reservation
router.post('/api/createe',reservation.create);

//delete byId
router.post('/api/deleteonee/:id',reservation.deleteById);
//updatebyId
router.post('/api/updateonee/:id',reservation.updateById);

router.get('/api/findAlle',reservation.findAll)

module.exports=router;