const {DataTypes} =require('sequelize')
const sequelize = require('../config/database')


const Script = sequelize.define('Script',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    script: {
        type: DataTypes.JSON
    }
},{   
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        tableName:'scripts'
})
module.exports = Script