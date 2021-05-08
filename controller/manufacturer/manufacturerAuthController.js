const { makeHash } = require('../../authentication/authServices');;
const crypto = require('crypto');
const {
    addManufacturer,
    deleteManufacturer,
    updatePassword,
    makeVerified,
    findByEmail,
    fetchById,
    findAllManufacturers
} = require("../../database/repository/manufacturer/manufacturerAuthRepository");
const { sendVerificationMail } = require('../../services/email/emailservices');
module.exports={
    addManufacturer1: async(req, res) => {
        console.log("yes,we are in controller in add manufacturer");

        const body = req.body;

        let password = crypto.randomBytes(12).toString('hex');

        await sendVerificationMail(password, body.email);


        body.password = makeHash(password);

        try {
            let result=await addManufacturer(body)
            return res.status(200).json({
                success: 1,
                data: result
            });
        }catch (e){
            return res.status(500).json({
                success: 0,
                message: e.sqlMessage,
            });
        }
    },


    deleteManufacturer1:async (req, res) => {
        console.log("yes,we are in deletecarid");
        const data = req.body.m_id;
        console.log(data);


        try{
            const isExist=await fetchById(data)
            console.log(isExist)
        }catch (e) {
            return res.status(500).json({
                success: 0,
                message: e.sqlMessage,
            });
        }
        try{
            const deleteResult=await deleteManufacturer(data)
            return res.json({
                success: 1,
                message: "manufacturer deleted successfully",
            });
        }catch (e){
            return res.status(500).json({
                success: 0,
                message: e.sqlMessage,
            });
        }

    },
    updatePassword1:async (req, res) => {

        console.log("in controller in updateCarId")
        const body = req.body;
        body.password=makeHash(body.password)
        email=body.email

        try{
           finalResult=await findByEmail(email)
            const verifyResult=await makeVerified(email)
            console.log(finalResult,"............")
        }catch (e) {
            return res.json({
                success: 0,
                message: "not found",
                error:e.sqlMessage
            });
        }
        try{
            const updateResult=await updatePassword(email,body.password)
            console.log(updateResult,"++++++++++++++")
            return res.json({
                success: 1,
                message: "password updated successfully",
            });
        }catch (e) {
            return res.json({
                success: 0,
                message: "failed to update",
                error:e
            });
        }

    },

    findAllManufacturers1:async (req,res)=>{

        try{
          const results= await findAllManufacturers(req.body.userId)
            return res.json({
                success: 1,
                results:results
            });
        }catch(e) {
            return res.json({
                success: 0,
                error:"not found"
            });
        }
    }

}