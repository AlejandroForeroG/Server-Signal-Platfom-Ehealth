const { Router } = require("express");
const router = Router();
const { getUsers, editUser } = require("../controllers/mainControler");
const userRouter = require("./userRouter");
const { deleteUser } = require("../controllers/mainControler");
router.use("/api/users", userRouter);
router.put("/api/users/update/:id", editUser);
router.delete("/api/users/delete/:id", deleteUser);
module.exports = router;
