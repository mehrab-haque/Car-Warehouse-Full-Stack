
const pool = require("../../../config/database");

module.exports={

    getCars:async()=>{
        const result=await pool.awaitQuery(`select * from car`,
           )
        return result
    },
    getCarByMake:async(make)=>{
        const result=await pool.awaitQuery(`select * from car where make=?`,
            [make])
        return result
    },
    getCarById:async(id)=>{
        const result=await pool.awaitQuery(`select * from car where registration_id=?`,
            [id])
        return result
    },
    getCarByModel:async(model)=>{
        const result=await pool.awaitQuery(`select * from car where model=?`,
            [model])
        return result
    },

    buyCar:async (id)=>{
        const result1=await pool.awaitQuery(`select * from car where registration_id=?`,[id])
         const q=result1[0].quantity
        console.log("before quantity",q)
        if(q===0) return 5
        const result=await pool.awaitQuery(`update car set quantity=? where registration_id=?`,
            [q-1,id])
        return result
    }

}