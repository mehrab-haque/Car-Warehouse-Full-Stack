
const pool = require("../../../config/database");

module.exports={

    addCar:async (data)=>{
        const result =await pool.awaitQuery(`insert into car(registration_id,year,colour,make,model,price,quantity,m_id)
         values(?,?,?,?,?,?,?,?)`,
            [

                data.registration_id,
                data.year,
                data.colour,
                data.make,
                data.model,
                data.price,
                data.quantity,
                data.userId
            ])
        return result
    },

    deleteCar:async(id,d)=>{
        const result=await pool.awaitQuery(`delete from car where registration_id=? and m_id=?`,
            [id,d])
        console.log("is it right",result)
        return result
    },

    updateCar:async(data,id)=>{
        const result=await pool.awaitQuery(`update car set year=?,colour=?,make=?,model=?,price=?,quantity=? where registration_id=? and m_id=?`,
            [
                data.year,
                data.colour,
                data.make,
                data.model,
                data.price,
                data.quantity,
                data.registration_id,
                id
            ])
        console.log(result,"ppppppppppppp")
        return result
    },

    getCars:async(m_id)=>{
        const result=await pool.awaitQuery(`select * from car where m_id=?`,
            [m_id])
        return result
    },
    getCarByMake:async(make,id)=>{
        const result=await pool.awaitQuery(`select * from car where make=? and m_id=?`,
            [make,id])
        return result
    },
    getCarById:async(id,d)=>{
        const result=await pool.awaitQuery(`select * from car where registration_id=? and m_id=?`,
            [id,d])
        return result
    },
    getCarByModel:async(model,id)=>{
        const result=await pool.awaitQuery(`select * from car where model=? and m_id=?`,
            [model,id])
        return result
    },
    fetchById:async(id,d)=>{
        const result=await pool.awaitQuery(`select * from car where registration_id=? and m_id=?`,
            [id,d])
        //console.log("is it right",result)
        return result
    },
}