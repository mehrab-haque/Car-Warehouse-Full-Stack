

const router = require("express").Router();
const { login } = require('../../authentication/authMiddlewares')
const { getAccessToken } = require('../../authentication/authControllers');
const {updatePassword1}=require('../../controller/manufacturer/manufacturerAuthController')
const {addCar1,deleteCar1,updateCar1,getCars1,getCarByMake1,getCarByModel1,getCarById1,getImage1}=require('../../controller/car/carController')
const { isValidManufacturerJWTToken } = require('../../authentication/authMiddlewares');

router.post('/manufacturer/login',login,getAccessToken)

//router.use(isValidManufacturerJWTToken);

//router.put("/manufacturer/updatePass", isValidManufacturerJWTToken, updatePassword1);

router.post('/manufacturer/car/register',isValidManufacturerJWTToken,addCar1)
router.put('/manufacturer/car/update',isValidManufacturerJWTToken,updateCar1)
router.delete('/manufacturer/car/delete',isValidManufacturerJWTToken,deleteCar1)
router.get('/manufacturer/car/getAll',isValidManufacturerJWTToken,getCars1)
router.get('/manufacturer/car/getByMake',isValidManufacturerJWTToken,getCarByMake1)
router.get('/manufacturer/car/getByModel',isValidManufacturerJWTToken,getCarByModel1)
router.get('/manufacturer/car/getById',isValidManufacturerJWTToken,getCarById1)
router.post('/manufacturer/car/image',isValidManufacturerJWTToken,getImage1)
module.exports=router