const { Sequelize, DataTypes, Model } = require("sequelize");
const connection = require("../database");
const sequelize = new Sequelize(connection);

class Pessoa extends Model {
  static init(connection) {
    super.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        nome: {
          type: DataTypes.STRING(100),
        },
        apelido: {
          type: DataTypes.STRING(32),
          unique: true,
          allowNull: false,
        },
        nascimento: DataTypes.STRING(10),
      },
      {
        sequelize: connection,
      }
    );
  }
}

Pessoa.init(sequelize);

module.exports = Pessoa;
