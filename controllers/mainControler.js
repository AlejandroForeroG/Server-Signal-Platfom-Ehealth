const { Pool } = require("pg");

const pool = new Pool({
  host: "192.168.10.22",
  user: "myUser",
  password: "myPassword",
  database: "myDB",
});



const editUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, age, weight, height, isactive } = req.body;

    //lo que va a conteneer el query dependiendo lo que se quiera modificar
    let query = "";
    if (name) {
      query += `name = '${name}', `;
    }
    if (height) {
      query += `height = '${height}', `;
    }
    if (weight) {
      query += `weight = '${weight}', `;
    }
    if (age) {
      query += `age = '${age}', `;
    }
    if (isactive !=null) {
      query += `isactive = '${isactive}', `;
    }
    query = query.slice(0, -2);

    console.log(query);
    const sql = `UPDATE usuarios SET ${query} WHERE id = '${id}'`;
    const usuario = await pool.query(sql);
    return res.status(200).json({ mensaje: "Usuario actualizado" });
   
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const deleteUser = async(req,res)=>{
  try {
    const id = req.params.id;
    const sql = `DELETE FROM usuarios WHERE id = '${id}'`;
    const usuario = await pool.query(sql);
    return res.status(200).json({ mensaje: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



module.exports = {
  editUser,
  deleteUser
};


