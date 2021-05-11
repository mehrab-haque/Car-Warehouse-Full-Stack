
const pool = require("../../../config/database");

module.exports={
    addManufacturer: async ( data)=> {

       // console.log(data.userId)
       const result=await pool.awaitQuery(`insert into manufacturer(username,password,email,a_id,verified)
         values(?,?,?,?,?)`,
           [

               data.username,
               data.password,
               data.email,
               data.userId,
               false
           ])
    return result
    },


    updatePassword:async(email,password)=>{
        const result=await pool.awaitQuery(`update manufacturer set password=? where email=?`,
            [
                password,
                email
            ])
        console.log(result,"ppppppppppppp")
        return result
    },

    makeVerified:async(email)=>{

        const result=await pool.awaitQuery( `update manufacturer set verified=?  where email=?`,
            [
                true,email
            ])
       return result
    },

    findByEmail:async(email)=>{
        const result =await pool.awaitQuery( `select * from manufacturer  where email=?`,
            [
                email
            ])
        return result
    },

    deleteManufacturer:async(m_id) => {
        const result=await pool.awaitQuery(`delete from manufacturer where m_id=?`,
            [m_id])
        return result
    },

    fetchById:async(m_id)=>{
        const result=await pool.awaitQuery(`select * from manufacturer where m_id=?`,
            [m_id])
        return result
    },

    findAllManufacturers:async()=>{
        const result=await pool.awaitQuery(`select * from manufacturer`,
            )
        return result
    }
}

