const pool = require("../config/database");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into regestration(firstName,lastName,gender,email,password,number)
         values(?,?,?,?,?,?)`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getUsers: (req, callBack) => {
    console.log(req.anything);
    pool.query(
      `select firstName,lastName,gender,email,password,number from regestration`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByEmail: (email, callBack) => {
    pool.query(
      `select * from regestration where email=?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `update regestration set firstName=?,lastName=?,gender=?,password=?,number=? where email=?`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.password,
        data.number,
        data.email,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `delete from regestration  where email=?`,
      [data.email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  /////part of manufacturer




  ///part of car table

  addCar1: (id, data, callBack) => {
    console.log(`manu_id ${id}`);
    pool.query(
      `insert into car(registration_id,year,colour,make,model,price,m_id)
         values(?,?,?,?,?,?,?)`,
      [
        data.registration_id,
        data.year,
        data.colour,
        data.make,
        data.model,
        data.price,
        id,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getAllCars: (callBack) => {
    //console.log(req.anything);
    pool.query(`select * from car`, [], (error, results, fields) => {
      if (error) {
        //console.log(error);
        return callBack(error);
      }
      console.log(`result in service ${results}`);
      return callBack(null, results);
    });
  },

  getCarByReg: (registration_id, callBack) => {
    pool.query(
      `select * from car where registration_id=?`,
      [registration_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getCarByMake: (make, callBack) => {
    pool.query(
      `select * from car where make=?`,
      [make],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getCarByModel: (model, callBack) => {
    pool.query(
      `select * from car where model=?`,
      [model],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getCarByModelAndMake: (model, make, callBack) => {
    console.log("in service");
    pool.query(
      `select * from car where model=? and make=?`,
      [model, make],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        console.log(`make model in servise ${results}`);
        return callBack(null, results);
      }
    );
  },

  deleteCar: (registration_id, callBack) => {
    pool.query(
      `delete from car where registration_id=?`,
      [registration_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        console.log(results[0]);
        return callBack(null, results[0]);
      }
    );
  },

    deleteCarByMId: (m_id, callBack) => {
        pool.query(
            `delete from car where m_id=?`,
            [m_id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                console.log(results[0]);
                return callBack(null, results[0]);
            }
        );
    },


  getCarsByOwn: (m_id, callBack) => {
    pool.query(
      `select * from car where m_id=?`,
      [m_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

    updateCar: (data, callBack) => {
        pool.query(
            `update car set year=?,colour=?,make=?,model=?,price=? where registration_id=?`,
            [
                data.year,
                data.colour,
                data.make,
                data.model,
                data.price,
                data.registration_id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                console.log(results)
                return callBack(null, results);
            }
        );
    },



    /////part of admin

    createAdmin: (data, callBack) => {
        pool.query(
            `insert into admin(username,password,email)
         values(?,?,?)`,
            [data.username, data.password,data.email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getAdminByUsernameAndPassword: (username, password, callBack) => {
        //const hash_pass = bcrypt.hashSync(password, process.env.SALT);

        console.log(username);
        pool.query(
            `select * from admin where username=?`,
            [username],
            (error, results, fields) => {
                //console.log(results.length);

                //console.log(hash_pass);
                if (error) {
                    // console.log(error);
                    return callBack(error);
                }

                if (results.length === 0) {
                    return callBack(error);
                }

                //console.log(results[0].password);

                var isMatch = bcrypt.compareSync(password, results[0].password);
                console.log(isMatch);

                if (isMatch) {
                    //  result.password = undefined;
                    //console.log(results[0], "why u bad");

                    const jsonwebtoken = sign({ result: results[0],type:"manufacturer" }, "buet123", {
                        expiresIn: "1y",
                    });
                    return callBack(null, {
                        token: jsonwebtoken,
                    });
                } else {
                    return callBack(error);
                }
                //console.log(results.rows);
            }
        );
    },

    addManufacturer: (id, data, callBack) => {
        console.log(`admin_id ${id}`);
        pool.query(
            `insert into manufacturer(username,password,a_id,email,verified)
         values(?,?,?,?,?)`,
            [
                data.username,
                data.password,
                id,
                data.email,
                false
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                function makeid(length) {
                    var result           = [];
                    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    var charactersLength = characters.length;
                    for ( var i = 0; i < length; i++ ) {
                        result.push(characters.charAt(Math.floor(Math.random() *
                            charactersLength)));
                    }
                    return result.join('');
                }

                var nodemailer = require('nodemailer');

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: "sairayeasminsa@gmail.com",
                        pass: process.env.CLIENT_PASS
                    }
                });

                var mailOptions = {
                    from: 'sairayeasminsa@gmail.com',
                    to: 'sairayeasminsa@gmail.com',
                    subject: 'Sending Email using Node.js',
                    text: 'Your password is buet123'
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                return callBack(null, results);
            }
        );
    }
};
