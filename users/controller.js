const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const {
  create,
  getUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
  createAdmin,
  getAdminByUsernameAndPassword,
    addManufacturer,
  addCar1,
  getAllCars,
  getCarByReg,
  getCarByMake,
  getCarByModel,
  getCarByModelAndMake,
  deleteCar,
  getCarsByOwn,
    updateCar,
    deleteCarByMId
} = require("./service");

module.exports = {
  createUser: (req, res) => {
    console.log("in controller in createuser")
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getUserByEmail: (req, res) => {
    console.log("in controller in getuserbyemail")
    const email = req.params.email;
    getUserByEmail(email, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "record not found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getUsers: (req, res) => {
    console.log("in controller in getuser")
    getUsers(req, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  updateUser: (req, res) => {
    console.log("in controller in updateuser")
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "failed to update",
        });
      }
      return res.json({
        success: 1,
        message: "updates successfully",
      });
    });
  },

  deleteUser: (Req, res) => {
    console.log("in controller in deleteuser")
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "record not found",
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully",
      });
    });
  },

  login: (req, res) => {
    console.log("in controller in login")
    const body = req.body;
    getUserByEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "invalid email or pssword?",
        });
      }

      const result = bcrypt.compareSync(body.password, results.password);
      if (result) {
        result.password = undefined;
        const jsonwebtoken = sign({ result: results }, "buet123", {
          expiresIn: "1y",
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsonwebtoken,
        });
      } else {
        return res.json({
          success: 0,
          data: "invalid email or pssword",
        });
      }
    });
  },
  //////part  of manufacturer


  getManufacturerByEmail: (req, res) => {
    console.log("yes,we are in controller getManufacturerByEmail");
    const email = req.params.email;
    getManufacturerByEmail(email, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "record not found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },



  ///////part of car


  addCar: (req, res) => {
    console.log("yes,we are in controller in addcar");
    const body = req.body;

    addCar1(req.anything, body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: err.sqlMessage,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getAllCarsC: (req, res) => {
    console.log("in controller in getallcar");
    getAllCars((err, results) => {
      if (err) {
        console.log(`error is${err}`);
        return;
      }
      console.log(`data is ${results}`);
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getAllCars1: (req, res) => {
    console.log("in controller in getallv=car");

    return res.json({
      success: 1,
      data: "in getAllCars1 function",
    });
    /* getAllCars((err, results) => {
      if (err) {
        console.log(`error is${err}`);
        return;
      }
      console.log(`data is ${results}`);
      return res.json({
        success: 1,
        data: results,
      });
    });*/
  },
  getCarByRegId: (req, res) => {
    console.log("yes,we are in controller in getcarbyregid");
    const registration_id = req.params.registration_id;
    getCarByReg(registration_id, (err, results) => {
      if (err) {
        console.log(`error in controller ${err}`);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "record not found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getCarByModelMakeId: (req, res) => {
    console.log("yes,we are in controller in getcarbymodelmakeid");
    var body = req.body;
    //console.log(model, make);
    getCarByModelAndMake(body.model, body.make, (err, results) => {
      if (err) {
        console.log(`error in controller ${err}`);
        return;
      }
      console.log(results);
      if (!results) {
        return res.json({
          success: 0,
          message: "record not found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getCarByMakeId: (req, res) => {
    console.log("yes,we are in controller in getcarmakeid");
    const make = req.params.make;
    getCarByMake(make, (err, results) => {
      if (err) {
        console.log(`error in controller ${err}`);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "record not found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getCarByModelId: (req, res) => {
    console.log("yes,we are in controller in getcarbymodelid");
    const model = req.params.model;
    getCarByModel(model, (err, results) => {
      if (err) {
        console.log(`error in controller ${err}`);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "record not found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  deleteCArId: (req, res) => {
    console.log("yes,we are in deletecarid");
    const data = req.body.registration_id;
    console.log(data);
    deleteCar(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(results);
      return res.json({
        success: 1,
        message: "car deleted successfully",
      });
    });
  },

  deleteCarByMId1: (id,req, res) => {
    console.log("yes,we are in deletecarid");
    const data = req.body.registration_id;
    console.log(data);
    deleteCarByMId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(results);
      return res.json({
        success: 1,
        message: "car deleted successfully",
      });
    });
  },

  getCarByOwnId: (req, res) => {
    console.log("yes,we are in controller in getcarbyownid");
    getCarsByOwn(req.anything, (err, results) => {
      if (err) {
        console.log(`error in controller ${err}`);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "record not found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },


  updateCarId: (req, res) => {

    console.log("in controller in updateCarId")
    const body = req.body;

    updateCar(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "failed to update",
        });
      }
      return res.json({
        success: 1,
        message: "updates successfully",
      });
    });
  },

  /////part of admin

  loginAdmin: (req, res) => {
    console.log("yes,we are in controller in login admin");
    const body = req.body;
    getAdminByUsernameAndPassword(
        body.username,
        body.password,
        (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.json({
              success: 0,
              message: "invalid email or pssword?",
            });
          }
          return res.json({
            success: 1,
            message: "login successfully",
            token: results.token,
          });
          /*
        const result = bcrypt.compareSync(body.password, results.password);
        if (result) {
          result.password = undefined;
          const jsonwebtoken = sign({ result: results }, "buet123", {
            expiresIn: "1y",
          });
          return res.json({
            success: 1,
            message: "login successfully",
            token: jsonwebtoken,
          });
        } else {
          return res.json({
            success: 0,
            data: "invalid email or pssword",
          });
        }*/
        }
    );
  },
  createAdmin1: (req, res) => {
    console.log("yes,we are in controller in createmanufacture");
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);
    createAdmin(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  addManufacturer1: (req, res) => {
    console.log("yes,we are in controller in addcar");


    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);
    addManufacturer(req.admin, body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: err.sqlMessage,
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  }


};
