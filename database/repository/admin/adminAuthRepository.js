const pool = require("../../../config/database");

module.exports={

    createAdmin: async(username,password,email) => {
        const result=await pool.awaitQuery(`insert into admin(username,password,email)
         values(?,?,?)`,
            [username,password,email])
        return result
    },

    getAdminByEmail: async (email) => {
        const result=await pool.awaitQuery(`select * from admin where email=?`,
            [email])
        console.log("in get admin by email",result)
        return result
    }

}