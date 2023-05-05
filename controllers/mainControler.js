const { Pool } = require("pg");

const pool = new Pool({
  host: "192.168.10.12",
  user: "myUser",
  password: "myPassword",
  database: "myDB",
});



const editUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, age, weight, height, isActive } = req.body;

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
    if (isActive !=null) {
      query += `isActive = '${isActive}', `;
    }
    query = query.slice(0, -2);
    console.log(isActive);
    console.log(query);

    const sql = `UPDATE usuarios SET ${query} WHERE id = '${id}'`;
    const usuario = await pool.query(sql);

    return res.status(200).json({ mensaje: "Usuario actualizado" });
   
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  editUser,
};
