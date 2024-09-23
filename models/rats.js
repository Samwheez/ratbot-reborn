module.exports = (sequelize, DataTypes) => {
	return sequelize.define('rats', {
		rarity: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			unique: true,
		},
		health: {
			type: DataTypes.INTEGER,
			defaultValue: 1,
			allowNull: false,
		},
		attack: {
			type: DataTypes.INTEGER,
			defaultValue: 1,
			allowNull: false,
		},
		defense: {
			type: DataTypes.INTEGER,
			defaultValue: 1,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
		},
	}, {
		timestamps: false,
	});
};