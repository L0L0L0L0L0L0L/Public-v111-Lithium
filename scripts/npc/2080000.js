/*
	Name: Horace
	Map: Starting Point
	Description: 240000000
*/

var selectedType = -1;
var selectedItem = -1;
var stimulator = false;
var item;
var mats;
var matQty;
var cost;
var stimID;

var cd_item = 4001078;
var cd_mats = new Array(4011001, 4011002, 4001079);
var cd_matQty = new Array(1, 1, 1);
var cd_cost = 25000;

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
		case -1:
			cm.dispose();
			return;
		case 0:
			if (status <= 3) {
				cm.dispose();
				return;
			}
			status--;
			break;
		case 1:
			status++;
			break;
	}
	switch (status) {
		case 0:
			var selStr = "Welcome! Here, you can enhance your weapons and items using various materials. Select an option below to proceed.";
			var options = new Array(
				"What is a stimulator?",
				"Enhance Warrior Weapon",
				"Enhance Bowman Weapon",
				"Enhance Magician Weapon",
				"Enhance Thief Weapon",
				"Enhance Pirate Weapon",
				"Make #t4001078#"
			);

			if (cm.isQuestStarted(7301) || cm.isQuestStarted(7303)) options.push("Make #t4001078#");

			for (var i = 0; i < options.length; i++) {
				selStr += "\r\n#L" + i + "# " + options[i] + "#l";
			}
			cm.sendSimple(selStr);
			break;
		case 1:
			selectedType = selection;
			if (selectedType > 5 && selectedType < 11) {
				stimulator = true;
				selectedType -= 5;
			} else
				stimulator = false;
			if (selectedType == 0) { // What's a stimulator?
				cm.sendNext("A stimulator is a special item used to enhance the effects of the dragon's power on your weapon. It has a chance to improve the weapon further, but if it fails, the weapon may be destroyed.");
				cm.dispose();
			}
			if (selectedType == 1) { // Warrior weapon
				var selStr = "Very well, which Warrior weapon would you like to enhance?#b";
				var weapon = new Array(
					"#z1302059# - Lv. 110 One-Handed Sword#b",
					"#z1312031# - Lv. 110 One-Handed Axe#b",
					"#z1322052# - Lv. 110 One-Handed BW#b",
					"#z1402036# - Lv. 110 Two-Handed Sword#b",
					"#z1412026# - Lv. 110 Two-Handed Axe#b",
					"#z1422028# - Lv. 110 Two-Handed BW#b",
					"#z1432038# - Lv. 110 Spear#b",
					"#z1442045# - Lv. 110 Polearm#b"
				);
				for (var i = 0; i < weapon.length; i++) {
					selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
				}
				cm.sendSimple(selStr);
			}
			if (selectedType == 2) { // Bowman weapon
				var selStr = "Very well, which Bowman weapon shall receive a dragon's power?#b";
				var weapon = new Array(
					"#z1452044# - Lv. 110 Bow#b",
					"#z1462039# - Lv. 110 Crossbow#b"
				);
				for (var i = 0; i < weapon.length; i++) {
					selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
				}
				cm.sendSimple(selStr);
			}
			if (selectedType == 3) { // Magician weapon
				var selStr = "Very well, which Magician weapon shall receive a dragon's power?#b";
				var weapon = new Array(
					"#z1372032# - Lv. 108 Wand#b",
					"#z1382036# - Lv. 110 Staff#b"
				);
				for (var i = 0; i < weapon.length; i++) {
					selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
				}
				cm.sendSimple(selStr);
			}
			if (selectedType == 4) { // Thief weapon
				var selStr = "Very well, which Thief weapon shall receive a dragon's power?#b";
				var weapon = new Array(
					"#z1332049# - Lv. 110 STR Dagger#b",
					"#z1332050# - Lv. 110 LUK Dagger#b",
					"#z1472051# - Lv. 110 Claw#b"
				);
				for (var i = 0; i < weapon.length; i++) {
					selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
				}
				cm.sendSimple(selStr);
			}
			if (selectedType == 5) { // Pirate weapon
				var selStr = "Very well, which Pirate weapon shall receive a dragon's power?#b";
				var weapon = new Array(
					"#z1482013# - Lv. 110 Knuckle#b",
					"#z1492013# - Lv. 110 Gun#b"
				);
				for (var i = 0; i < weapon.length; i++) {
					selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
				}
				cm.sendSimple(selStr);
			}
			if (selectedType == 11) { // Cornian's Dagger
				var selStr = "To create #t4001078#, I will need the following materials: #v4011001:#, #v4011002:#, and #v4001079:#.";
				cm.sendNext(selStr);
			}
			break;
		case 2:
			selectedItem = selection;

			if (selectedType == 1) { // Warrior weapon
				var itemSet = new Array(1302059, 1312031, 1322052, 1402036, 1412026, 1422028, 1432038, 1442045);
				var matSet = new Array(
					new Array(1302056, 4000244, 4000245, 4005000),
					new Array(1312030, 4000244, 4000245, 4005000),
					new Array(1322045, 4000244, 4000245, 4005000),
					new Array(1402035, 4000244, 4000245, 4005000),
					new Array(1412021, 4000244, 4000245, 4005000),
					new Array(1422027, 4000244, 4000245, 4005000),
					new Array(1432030, 4000244, 4000245, 4005000),
					new Array(1442044, 4000244, 4000245, 4005000)
				);
				var matQtySet = new Array(
					new Array(1, 20, 25, 8),
					new Array(1, 20, 25, 8),
					new Array(1, 20, 25, 8),
					new Array(1, 20, 25, 8),
					new Array(1, 20, 25, 8),
					new Array(1, 20, 25, 8),
					new Array(1, 20, 25, 8),
					new Array(1, 20, 25, 8)
				);
				var costSet = new Array(120000, 120000, 120000, 120000, 120000, 120000, 120000, 120000);
				item = itemSet[selectedItem];
				mats = matSet[selectedItem];
				matQty = matQtySet[selectedItem];
				cost = costSet[selectedItem];
			}
			if (selectedType == 2) { // Bowman weapon
				var itemSet = new Array(1452044, 1462039);
				var matSet = new Array(
					new Array(1452019, 4000244, 4000245, 4005000, 4005002),
					new Array(1462015, 4000244, 4000245, 4005000, 4005002)
				);
				var matQtySet = new Array(new Array(1, 20, 25, 3, 5), new Array(1, 20, 25, 5, 3));
				var costSet = new Array(120000, 120000);
				item = itemSet[selectedItem];
				mats = matSet[selectedItem];
				matQty = matQtySet[selectedItem];
				cost = costSet[selectedItem];
			}
			if (selectedType == 3) { // Magician weapon
				var itemSet = new Array(1372032, 1382036);
				var matSet = new Array(
					new Array(1372010, 4000244, 4000245, 4005001, 4005003),
					new Array(1382035, 4000244, 4000245, 4005001, 4005003)
				);
				var matQtySet = new Array(new Array(1, 20, 25, 6, 2), new Array(1, 20, 25, 6, 2));
				var costSet = new Array(120000, 120000);
				item = itemSet[selectedItem];
				mats = matSet[selectedItem];
				matQty = matQtySet[selectedItem];
				cost = costSet[selectedItem];
			}
			if (selectedType == 4) { // Thief weapon
				var itemSet = new Array(1332049, 1332050, 1472051);
				var matSet = new Array(
					new Array(1332051, 4000244, 4000245, 4005000, 4005002),
					new Array(1332052, 4000244, 4000245, 4005002, 4005003),
					new Array(1472053, 4000244, 4000245, 4005002, 4005003)
				);
				var matQtySet = new Array(new Array(1, 20, 25, 5, 3), new Array(1, 20, 25, 3, 5), new Array(1, 20, 25, 2, 6));
				var costSet = new Array(120000, 120000, 120000);
				item = itemSet[selectedItem];
				mats = matSet[selectedItem];
				matQty = matQtySet[selectedItem];
				cost = costSet[selectedItem];
			}
			if (selectedType == 5) { // Pirate weapon
				var itemSet = new Array(1482013, 1492013);
				var matSet = new Array(
					new Array(1482012, 4000244, 4000245, 4005000, 4005002),
					new Array(1492012, 4000244, 4000245, 4005000, 4005002)
				);
				var matQtySet = new Array(new Array(1, 20, 25, 5, 3), new Array(1, 20, 25, 3, 5));
				var costSet = new Array(120000, 120000);
				item = itemSet[selectedItem];
				mats = matSet[selectedItem];
				matQty = matQtySet[selectedItem];
				cost = costSet[selectedItem];
			}
			if (selectedType == 11) { // Cornian's Dagger
				item = cd_item;
				mats = cd_mats;
				matQty = cd_matQty;
				cost = cd_cost;
			}

			var prompt = "You want me to make a #t" + item + "#? In that case, I'm going to need specific items from you in order to make it. Make sure you have room in your inventory, though!#b";
			if (stimulator) {
				stimID = getStimID(item);
				prompt += "\r\n#i" + stimID + "# 1 #t" + stimID + "#";
			}
			if (mats instanceof Array) {
				for (var i = 0; i < mats.length; i++) {
					prompt += "\r\n#i" + mats[i] + "# " + matQty[i] + " #t" + mats[i] + "#";
				}
			} else {
				prompt += "\r\n#i" + mats + "# " + matQty + " #t" + mats + "#";
			}
			if (cost > 0)
				prompt += "\r\n#i4031138# " + cost + " meso";
			cm.sendYesNo(prompt);
			break;
		case 3:
			var complete = true;

			if (!cm.canHold(item, 1)) {
				cm.sendOk("You do not have enough inventory space.");
				cm.dispose();
				return;
			} else if (cm.getMeso() < cost) {
				cm.sendOk("Sorry, you do not have enough mesos.");
				cm.dispose();
				return;
			} else {
				if (mats instanceof Array) {
					for (var i = 0; complete && i < mats.length; i++)
						if (!cm.haveItem(mats[i], matQty[i]))
							complete = false;
				} else if (!cm.haveItem(mats, matQty))
					complete = false;
			}
			if (stimulator) { // Check for stimulator
				if (!cm.haveItem(stimID)) {
					complete = false;
				}
			}
			if (!complete)
				cm.sendOk("I'm afraid that without the correct items, the enhancement would not be reliable. Please bring the correct items next time.");
			else {
				if (mats instanceof Array) {
					for (var i = 0; i < mats.length; i++) {
						cm.gainItem(mats[i], -matQty[i]);
					}
				} else
					cm.gainItem(mats, -matQty);
				cm.gainMeso(-cost);
				if (stimulator) { // Check for stimulator
					cm.gainItem(stimID, -1);
					var deleted = Math.floor(Math.random() * 10);
					if (deleted != 0) {
						cm.gainItem(item, 1, true, true);
						cm.sendOk("The process is complete. Treat your weapon well, lest you bring the wrath of the dragons upon you.");
					} else {
						cm.sendOk("Unfortunately, the enhancement failed, and the weapon was destroyed.");
					}
				} else { // Just give the basic item
					cm.gainItem(item, 1);
					cm.sendOk("The item has been successfully created. Treat it well.");
				}
			}
			cm.dispose();
	}
}

function getStimID(equipID) {
	var cat = Math.floor(equipID / 10000);
	switch (cat) {
		case 130: // 1h sword
			return 4130002;
		case 131: // 1h axe
			return 4130003;
		case 132: // 1h bw
			return 4130004;
		case 140: // 2h sword
			return 4130005;
		case 141: // 2h axe
			return 4130006;
		case 142: // 2h bw
			return 4130007;
		case 143: // spear
			return 4130008;
		case 144: // polearm
			return 4130009;
		case 137: // wand
			return 4130010;
		case 138: // staff
			return 4130011;
		case 145: // bow
			return 4130012;
		case 146: // xbow
			return 4130013;
		case 148: // knuckle
			return 4130016;
		case 149: // pistol
			return 4130017;
		case 133: // dagger
			return 4130014;
		case 147: // claw
			return 4130015;
	}
	return 4130002;
}
