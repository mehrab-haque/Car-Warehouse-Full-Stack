const {
  createUser,
  getUserByEmail,
  getUsers,
  updateUser,
  deleteUser,
  login,
  addCar,
  createAdmin1,
  loginAdmin,
    addManufacturer1,
  getAllCarsC,
  getCarByRegId,
  getCarByMakeId,
  getCarByModelId,
  getCarByModelMakeId,
  deleteCArId,
  getCarByOwnId,
  getAllCars1,
    updateCarId
} = require("./controller");
const router = require("express").Router();
const {checkToken} = require("../auth/token_validation");
router.get("/manufacturer/getCars", checkToken, getCarByModelMakeId);
router.get("/manufacturer/get_car_by_id/:registration_id", checkToken, getCarByRegId);
router.get("/manufacturer/get_car_by_make/:make", checkToken, getCarByMakeId);
router.get("/manufacturer/get_car_by_model/:model", checkToken, getCarByModelId);
router.post("/admin/register", checkToken, createAdmin1);
router.post("/manufacturer/addCar", checkToken, addCar);
router.post("/admin/addManufacturer", checkToken, addManufacturer1);
router.post("/admin/login", loginAdmin);
router.get("/viewer/get_all_cars", getAllCarsC);

router.get("/manufacturer/getcarsAll", checkToken, getCarByOwnId);
router.delete("/manufacturer/delete_car", checkToken, deleteCArId);
router.put("/manufacturer/update_car", checkToken, updateCarId);

router.post("/", checkToken, createUser);
router.post("/login", login);
router.get("/auth", checkToken, getUsers);
router.get("/auth/:email", checkToken, getUserByEmail);
router.patch("/auth", checkToken, updateUser);
router.delete("/auth", checkToken, deleteUser);

module.exports = router;
