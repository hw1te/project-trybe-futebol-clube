import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {}

User.init({
  id: {
    type: typeof DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: typeof DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: typeof DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: typeof DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: typeof DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default User;
