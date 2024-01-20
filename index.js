const express = require("express");
const cors = require("cors");
const Pessoa = require("./models/Pessoa");
const crypto = require("crypto");
const { Op } = require("sequelize");

const app = express();
app.use(express.json());
app.use(cors());
const router = express.Router();

router.post("/pessoas", async (req, res) => {
  const { nome, apelido, nascimento, stack } = req.body;

  const dateRegex = /^\d\d\d\d-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1])$/;

  const nascimentoValido = dateRegex.test(nascimento);

  if (stack) {
    const isArray = Array.isArray(stack);
    if (!isArray) {
      return res.status(422).json({ message: "stack is invalid." });
    }

    let isValid = true,
      message = "";

    for (let i = 0; i < stack.length; i++) {
      const language = stack[i];
      if (typeof language !== "string") {
        isValid = false;
        message = "somente é aceito strings na stack.";
        break;
      }

      if (language.length > 32) {
        isValid = false;
        message = `a linguagem ${language} é maior que 32 caracteres.`;
        break;
      }
    }

    if (!isValid) {
      return res.status(422).json({ message });
    }
  }

  if (!nascimentoValido) {
    return res
      .status(422)
      .json({ message: "formato do nascimento é inválido." });
  }

  let response = null;
  try {
    const pessoa = await Pessoa.create({
      id: crypto.randomUUID(),
      nome,
      apelido,
      nascimento,
      stack,
    });

    response = res.status(201).json({ message: "created.", pessoa });
  } catch (e) {
    response = res.status(422).json({ message: e.message });
  }

  return response;
});

router.get("/pessoas/:id", async (req, res) => {
  const { id: pessoaId } = req.params;

  const pessoa = await Pessoa.findOne({ where: { id: pessoaId } });

  if (!pessoa)
    return res
      .status(404)
      .json({ message: "id informado não foi encontrado." });

  return res.status(200).json(pessoa);
});

router.get("/pessoas", async (req, res) => {
  const termo = req.query.t;

  const pessoas = await Pessoa.findAll({
    where: {
      [Op.or]: {
        apelido: { [Op.like]: `%${termo}%` },
        nome: { [Op.like]: `%${termo}%` },
        stack: { [Op.like]: `%${termo}%` },
      },
    },
  });
  return res.status(200).json({ pessoas });
});

router.get("/contagem-pessoas", async (req, res) => {
  const count = await Pessoa.count();

  return res.status(200).json({ total: `${count} registros.` });
});

app.use(router);

const PORT = process.env.HTTP_PORT;
app.listen(PORT);

console.log(`Server ready for connection on port: ${PORT}`);
