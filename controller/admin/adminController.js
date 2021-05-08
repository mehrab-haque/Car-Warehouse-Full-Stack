const bcrypt = require("bcryptjs");

const {
    createAdmin
} = require("../../database/repository/admin/adminAuthRepository");
const { makeHash } = require('../../auth/authServices');
module.exports={


    createAdmin1: async(req, res) => {
        console.log("yes,we are in controller in createadmin1");
        const body = req.body;
        body.password =makeHash(body.password);
        try{
            let result=await createAdmin(body.username,body.password,body.email);
            console.log(result)
            return res.status(200).json({
                success: 1,
                data: result,
            });
        }catch(err){
            return res.status(500).json({
                success: 0,
                error: err.sqlMessage,
            });
        }
    }
}