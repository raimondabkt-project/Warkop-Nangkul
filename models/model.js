import { Sequelize, DataTypes } from 'sequelize';
const sequelize = new Sequelize("nangkul_project", "root", "Gemer$12345", {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+07:00'
});
export { sequelize, DataTypes };