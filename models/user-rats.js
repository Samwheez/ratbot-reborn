module.exports = (sequelize, DataTypes) => {
	return sequelize.define('user_rats', {
		user_id: {
			type: DataTypes.STRING,
		},
		name: {
            type: DataTypes.STRING,
        },
        rarity: {
            type: DataTypes.STRING,
        },
		health: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        attack: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        defense: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
	}, {
		timestamps: false,
	});
};