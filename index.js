const express = require("express");
const cors = require("cors");
/*const { Sequelize } = require("sequelize");
const connection = require("./database");
*/
const app = express();
app.use(express.json());
app.use(cors());
const router = express.Router();

//const sequelize = new Sequelize(connection);

router.post("/pessoas", (req, res) => {
  return res.status(201).json({ message: "created." });
});

router.get("/pessoas/:id", async (req, res) => {
  const { id: pessoaId } = req.params;

  return res.status(200).json({ message: pessoaId });
});

router.get("/pessoas", (req, res) => {
  const termo = req.query.t;

  return res.status(200).json({ message: termo });
});

router.get("/contagem-pessoas", (req, res) => {
  return res.status(200).json({ total: "220 registros." });
});

app.use(router);

const PORT = 80;
app.listen(PORT);

console.log(`Server ready for connection on port: ${PORT}`);
