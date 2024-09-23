module.exports = (sequelize, DataTypes) => {
	return sequelize.define('users', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		balance: {
			type: DataTypes.INTEGER,
			defaultValue: 2,
			allowNull: false,
		},
        cooldown: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
	}, {
		timestamps: false,
	});
};