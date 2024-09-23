// TODO transfer, flex, better message for drops, fights, maybe change rats to be a db instead, seems better.

const { Collection } = require('discord.js');
const db = require('./db-objects.js');
const fs = require('node:fs');
const path = require('node:path');

const config = require('./ratresources/ratconfig.json');

rats = new Array(new Array(), new Array(), new Array(), new Array());



function InitRats() {
    const ratsPath = path.join(__dirname, 'assets', 'jsondata', 'rats');
    const ratFolders = fs.readdirSync(ratsPath);


    for (const folder of ratFolders) {
        const ratdataPath = path.join(ratsPath, folder);
        ratdata = require(path.join(ratdataPath, 'data.json'));

        if (ratdata) {
            ratdata.image = ratdataPath;
            rats[ratdata.rarity].push(ratdata);
        } else {
            console.log(`[WARNING] data.json not found in ${ratdataPath}`);
        }
    }
}

async function Gimme(id) {
    const cooldown = config.gimmeCooldown * 1_000;
    const expirationTime = (db.GetCooldown(id) || 0) + cooldown;


    if (Date.now() > expirationTime) {
        const newBalance = await db.AddBalance(id, config.gimmeAmount);
        db.StartCooldown(id);

        return { content: `You now have ${newBalance} Rat Tokens` };        
    } else {
        const expiredTimestamp = Math.round(expirationTime / 1_000);

        return { content: `Next gimme available again in <t:${expiredTimestamp}:R>.`, ephemeral: true };
    }
}

function Roll(id) {
    if (db.GetBalance(id) >= config.rollPrice) {
        const rarity = RandomRarity();
        console.log(rarity);
        const droppedIndex = Math.floor(Math.random() * rats[rarity].length);

        const rat = rats[rarity][droppedIndex];

        db.AddBalance(id, -config.rollPrice);
    
        db.AddRat(id, rat);

        return { content: `You got ${rat.name}.`};
    } else {
        return { content: `You don't have enough bread.`};
    }
}

function RandomRarity() {
    var droppedRarity = Math.floor(Math.random() * 101);
	var idx = 0;

	for (rarity of config.rarityPercentChance) {
        console.log(rarity);
		droppedRarity -= rarity;
		if (droppedRarity <= 0)
			return idx;
		idx++;
	}

    //return idx;
}

module.exports = { InitRats, Gimme, Roll};