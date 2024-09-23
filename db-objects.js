const { Sequelize, Op} = require('sequelize');
const { Collection, User } = require('discord.js');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Users = require('./models/users.js')(sequelize, Sequelize.DataTypes);
// const Rats = require('./models/rats.js')(sequelize, Sequelize.DataTypes);
const UserRats = require('./models/user-rats.js')(sequelize, Sequelize.DataTypes);

ratTokens = new Collection();
cooldowns = new Collection();


async function InitData() {
	const storedUsers = await Users.findAll();
	storedUsers.forEach(user => ratTokens.set(user.user_id, user.balance));
	storedUsers.forEach(user => cooldowns.set(user.user_id, user.cooldown));
}

function GetBalance(id) {
	return (ratTokens.get(id) || 0);
}

async function AddBalance(id, amount) {
	if (!ratTokens.has(id)) {
		await insertUser(id);
	}

	const newBal = ratTokens.get(id) + amount;
	ratTokens.set(id, newBal);

	console.log(newBal);

	await Users.update(
		{ balance: newBal },
		{ where: { user_id: id }
	});

	return newBal;
}

function GetCooldown(id) {
	return cooldowns.get(id);
}

async function StartCooldown(id) {
	const now = Date.now();

	const user = await Users.update(
		{ cooldown: now },
		{ where: { user_id: id }
	});

	cooldowns.set(id, now);
}

async function AddRat(id, rat) {
	const userRat = await UserRats.findOne({
		where: { user_id: id, name: rat.name},
	});

	if (userRat) {
		const newAmount = userRat.amount + 1;
		await UserRats.update(
			{ amount: newAmount },
			{ where: { user_id: id, name: rat.name }
		});
	} else {
		UserRats.upsert({ user_id: id, name: rat.name, rarity: rat.rarity, 
			health: rat.stats.health,
			attack: rat.stats.attack,
			defense: rat.stats.defense,
			amount: 1
		});
	}
}

async function GetRatsByRarity(id, rareness) {
	return await UserRats.findAll({
		where: { user_id: id, rarity: rareness }
	});
}

async function insertUser(id) {
	await Users.upsert({ user_id: id, balance: 0, cooldown: 0 });
	ratTokens.set(id, 0);
}

module.exports = { InitData, GetBalance, AddBalance, GetCooldown, StartCooldown, AddRat, GetRatsByRarity };
