const { Router } = require("express");
const router = Router();
const { getUsers, editUser } = require("../controllers/mainControler");
const userRouter = require("./userRouter");
const { deleteUser } = require("../controllers/mainControler");
const {
  getSample,
  getDataSignals,
} = require("../controllers/signalsController");

router.use("/api/users", userRouter);
router.put("/api/users/update/:id", editUser);
router.delete("/api/users/delete/:id", deleteUser);
router.get("/api/muestras/:id", getSample);
router.get("/api/dataSignals/:id/:muestraid/:tipo", getDataSignals);
module.exports = router;
