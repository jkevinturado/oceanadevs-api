import { DataTypes, Model, Optional } from 'sequelize';
import db from '../../helpers/database';

interface UserAttributes {
  id?: string;
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  type: string;
  isActive?: boolean;
  newlyRegistered?: boolean;
  token?: string | null;
  token_expiration?: Date | null;
  resetpwd_token?: string | null;
  resetpwd_token_expiration?: Date | null;
  changepassworddate?: Date | null;
  lastlogined?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const User = db.define<UserInstance>(
  'users',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: false,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('ADMIN', 'USER'),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    newlyRegistered: {
      type: DataTypes.BOOLEAN,
    },
    token: {
      type: DataTypes.TEXT,
    },
    token_expiration: {
      type: DataTypes.DATE,
    },
    resetpwd_token: {
      type: DataTypes.TEXT,
    },
    resetpwd_token_expiration: {
      type: DataTypes.DATE,
    },
    changepassworddate: {
      type: DataTypes.DATE,
    },
    lastlogined: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
  }
);
export default User;
export { UserCreationAttributes };
