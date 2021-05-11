

const router = require("express").Router();

const {buyCar1,getCars1,getCarByMake1,getCarByModel1,getCarById1}=require('../../controller/viewer/viewerController')

router.get('/viewer/car/getAll',getCars1)
router.get('/viewer/car/getByMake',getCarByMake1)
router.get('/viewer/car/getByModel',getCarByModel1)
router.get('/viewer/car/getById',getCarById1)

router.put("/viewer/car/buy",buyCar1)

module.exports=router