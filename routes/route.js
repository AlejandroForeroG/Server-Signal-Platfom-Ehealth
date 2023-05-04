const { Router } = require("express");
const router = Router();
const {getUsers,editUser} = require("../controllers/mainControler");

router.get("/api/users", getUsers);
router.put("/api/users/update/:id", editUser);

module.exports = router;
