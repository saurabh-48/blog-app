import pkg from 'sequelize';
import sequelize from '../../lib/sequelize.js';
const { DataTypes, Model } = pkg;

class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}

User.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: DataTypes.STRING,
  middle_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  gender: DataTypes.STRING,
  email: DataTypes.STRING,
  contact_number: DataTypes.STRING,
  birth_date: DataTypes.DATE,
  user_name: DataTypes.STRING,
  password: DataTypes.STRING,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  underscored: true,
});

export default User;
