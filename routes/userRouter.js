const express = require("express");
const userRouter = express.Router();
const { Pool } = require("pg");

const pool = new Pool({
  host: "192.168.10.20",
  user: "myUser",
  password: "myPassword",
  database: "myDB",
});

userRouter.get("/", async (req, res) => {
  const response = await pool.query("SELECT * FROM usuarios");
  res.status(200).json(response.rows);
});


userRouter.get("/:isactive", async (req, res) => {
  isActive = req.params.isactive;
  try{
    const response = await pool.query(
      `SELECT * FROM usuarios WHERE isActive is ${isActive}`
    );
    if(response.rows.length === 0){
      res.status(202).json({isactive:false})
    }
    res.status(200).json(response.rows[0]);

  }catch(err){
    res.status(600).json({isactive:false})
  }
});

module.exports = userRouter;
