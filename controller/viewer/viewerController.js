const {
    getCars,
    getCarByMake,
    getCarByModel,
    getCarById,
    buyCar
} = require("../../database/repository/viewer/viewerRepository");

module.exports={
    getCars1:async (req,res)=>{
        console.log("yes we are in get cars 1")
        try{
            const results= await getCars()
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
        console.log("yes we are in get car by make 1")
        try{
            const results= await getCarByMake(req.body.make)
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
        console.log("yes we are in get car by modelr 1")
        try{
            const results= await getCarByModel(req.body.model)
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
        console.log("yes we are in get car by id 1")
        try{
            const results= await getCarById(req.body.registration_id)
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

    buyCar1:async (req,res)=>{
        try{
            const results= await buyCar(req.body.registration_id)
            if(results===5){
                return res.json({
                    success: 0,
                    error:"out of stock"
                });
            }
            return res.json({
                success: 1,
                results:"car is bought successfully"
            });
        }catch(e) {
            return res.json({
                success: 0,
                error:e
            });
        }
    }
}