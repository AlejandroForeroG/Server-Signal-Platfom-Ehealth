const { Router } = require("express");
const router = Router();
const {getUsers,editUser} = require("../controllers/mainControler");
const userRouter = require ("./userRouter")

router.use("/api/users", userRouter);
router.put("/api/users/update/:id", editUser);

module.exports = router;
