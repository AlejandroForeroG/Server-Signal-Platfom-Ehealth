const { Pool } = require("pg");

const pool = new Pool({
  host: "192.168.10.19",
  user: "myUser",
  password: "myPassword",
  database: "myDB",
});

async function newMuestra(user) {
  try {
    const sql = `INSERT INTO muestras(userID) values (${user.id})`;
    const usuario = await pool.query(sql);
    console.log("creada nueva muestra para usuario: ", user.id);
  } catch (e) {
    console.log(e);
  }
}

async function insertSample(valor, id) {
  try {
    let sql = `INSERT INTO signals(MuestraID, Tipo, Valor) VALUES `;

    valor.forEach((element, index) => {
      sql += `((SELECT MAX(MuestraID) FROM Muestras),${id}, ${element})`;
      if (index !== valor.length - 1) {
        sql += ", ";
      } else {
        sql += ";";
      }
    });
    await pool.query(sql);
  } catch (e) {
    console.log(e);
  }
}

const getSample = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `SELECT * FROM muestras WHERE userId = ${id}`;
    const response = await pool.query(sql);
    res.status(200).json(response.rows);
  } catch (e) {
    res.status(600).json({ isactive: false });
  }
};

const getDataSignals = async (req, res) => {
  try {
    const userid = req.params.id;
    const tipo = req.params.tipo;
    const muestraid= req.params.muestraid;
    const sql = `SELECT signals.*
      FROM signals
      JOIN muestras ON signals.muestraid = muestras.muestraid
      JOIN usuarios ON muestras.userid = usuarios.id
      WHERE signals.tipo = ${tipo} AND muestras.muestraid = ${muestraid} AND usuarios.id = ${userid};`;
    const response = await pool.query(sql);
    res.status(200).json(response.rows);
  } catch (e) {
    res.status(600).json({ isactive: false });
  }
};
module.exports = { newMuestra, insertSample, getSample, getDataSignals };
//
