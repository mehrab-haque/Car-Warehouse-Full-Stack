const {
    createAdmin1,

} = require("../../controller/admin/adminController");
const router = require("express").Router();
const { login } = require('../../authentication/authMiddlewares')
const { getAccessToken } = require('../../authentication/authControllers');
const { isValidAdminJWTToken } = require('../../authentication/authMiddlewares');
const {addManufacturer1,findAllManufacturers1,deleteManufacturer1}=require('../../controller/manufacturer/manufacturerAuthController')

router.post("/admin/register",  createAdmin1);
router.post("/admin/login", login,getAccessToken);
//router.use(isValidAdminJWTToken);


router.post("/admin/addManufacturer",isValidAdminJWTToken, addManufacturer1);
router.delete("/admin/deleteManufacturer",isValidAdminJWTToken, deleteManufacturer1);
router.get("/admin/getManufactures",isValidAdminJWTToken,findAllManufacturers1)


module.exports=router;