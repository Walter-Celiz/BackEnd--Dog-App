const { DataTypes } = require('sequelize')
//define the model
module.exports = (sequelize) => {
    sequelize.define('temperament', {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
        {
            timestamps: false,
            createdAt: false,
        }
    )
}