const {
    addCar,
    deleteCar,
    updateCar,
    getCars,
    getCarByMake,
    getCarByModel,
    fetchById,
    getCarById
} = require("../../database/repository/car/carRepository");

module.exports={
    addCar1:async (req,res)=>{
        try{
            let result=await addCar(req.body)
            return res.status(200).json({
                success: 1,
                data: result
            });
        }catch (e) {
            return res.status(500).json({
                success: 0,
                message: e.sqlMessage,
            });
        }
    },

    deleteCar1:async (req,res)=>{
        try{
            const isExist=await fetchById(req.body.registration_id,req.body.userId)
            console.log(isExist)
        }catch (e) {
            return res.status(500).json({
                success: 0,
                message: e.sqlMessage,
            });
        }
        try{
            const deleteResult=await deleteCar(req.body.registration_id)
            return res.json({
                success: 1,
                message: "car deleted successfully",
            });
        }catch (e){
            return res.status(500).json({
                success: 0,
                message: e.sqlMessage,
            });
        }
    },

    updateCar1:async (req,res)=>{
        try{
            const isExist=await fetchById(req.body.registration_id,req.body.userId)
            //console.log(isExist)
        }catch (e) {
            return res.status(500).json({
                success: 0,
                message: e.sqlMessage,
            });
        }
        try{
            const updateResult=await updateCar(req.body)
            return res.json({
                success: 1,
                message: "car updated successfully",
            });
        }catch (e){
            return res.status(500).json({
                success: 0,
                message: e.sqlMessage,
            });
        }
    },

    getCars1:async (req,res)=>{
        try{
            const results= await getCars(req.body.userId)
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
    },

    getCarByMake1:async (req,res)=>{
        try{
            const results= await getCarByMake(req.body.make,req.body.userId)
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
    },
    getCarByModel1:async (req,res)=>{
        try{
            const results= await getCarByModel(req.body.model,req.body.userId)
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
    },
    getCarById1:async (req,res)=>{
        try{
            const results= await getCarById(req.body.registration_id,req.body.userId)
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