import { sequelize, DataTypes } from "./model.js";
const Admin = sequelize.define('admin', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    active: DataTypes.TINYINT,
});
export default Admin;