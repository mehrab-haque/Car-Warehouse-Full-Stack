const {
    createAdmin1,

} = require("../../controller/admin/adminController");
//console.log(createAdmin1)
const router = require("express").Router();
const { login } = require('../../authentication/authMiddlewares')
const { getAccessToken } = require('../../authentication/authControllers');
const { isValidAdminJWTToken } = require('../../authentication/authMiddlewares');
const {addManufacturer1,findAllManufacturers1,deleteManufacturer1}=require('../../controller/manufacturer/manufacturerAuthController')
//console.log("before")
router.post("/admin/register",  createAdmin1);
//console.log("after")
router.post("/admin/login", login,getAccessToken);

router.post("/normal",(req,res)=>{
    return res.status(200).json({
        success:"never be accomplished"

    });
})
//router.use(isValidAdminJWTToken);
//console.log("then")


router.post("/admin/addManufacturer",isValidAdminJWTToken, addManufacturer1);
router.delete("/admin/deleteManufacturer",isValidAdminJWTToken, deleteManufacturer1);
router.get("/admin/getManufactures",isValidAdminJWTToken,findAllManufacturers1)


module.exports=router;