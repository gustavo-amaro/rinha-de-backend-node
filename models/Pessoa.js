const { Sequelize, DataTypes, Model } = require("sequelize");
const config = require("../database");
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

class Pessoa extends Model {
  static init(connection) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
        },
        nome: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        apelido: {
          type: DataTypes.STRING(32),
          unique: true,
          allowNull: false,
        },
        nascimento: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        stack: {
          type: DataTypes.JSON,
          allowNull: true,
        },
      },
      {
        sequelize: connection,
        createdAt: false,
        updatedAt: false,
      }
    );
  }
}

Pessoa.init(sequelize);

module.exports = Pessoa;
