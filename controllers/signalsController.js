const { Pool } = require("pg");

const pool = new Pool({
  host: "192.168.10.20",
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

async function insertSample(valor) {
  try {
    let sql = `INSERT INTO signals(MuestraID, Tipo, Valor) VALUES `

    valor.forEach((element,index) => {
      sql +=`((SELECT MAX(MuestraID) FROM Muestras),${1}, ${element})`;
      if (index !== valor.length - 1) {
        sql += ", ";
      }else{
        sql+=";"
      }
    });
    const usuario = await pool.query(sql);
    console.log(sql);
  } catch (e) {
    console.log(e);
  }
}
module.exports = { newMuestra,insertSample };
