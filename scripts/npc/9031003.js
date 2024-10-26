/*
	Name: Elson
	Map: Professional Skill Village <Meister Town>
	Description: 910001000
*/

function start() {
	var chat = "I am the master of Equipment Crafting, #bElson#k. Do you need something from me?#b";
	chat += "\r\n#L0#Listen to an explanation about #eEquipment Crafting#n#l";

	if (cm.getPlayer().getProfessionLevel(92020000) > 0) {
		chat += "\r\n#L2#Abandon #eEquipment Crafting#n skill (You will lose all experience/levels in Equipment Crafting)#l";
	} else {
		chat += "\r\n#L1#Learn the #eEquipment Crafting#n skill#l";
	}

	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
		return;
	}

	switch (selection) {
		case 0:
			// Provide explanation of Equipment Crafting
			cm.sendOk("Equipment Crafting is the technology of crafting armor and weapons by smelting ores or gems refined from mining in a large furnace. Once you learn Equipment Crafting from me, you will be able to create weapons and armor that you've never seen before.");
			break;
		case 1:
			// Check if the player already knows Accessory Crafting
			if (cm.getPlayer().getProfessionLevel(92030000) > 0) {
				cm.sendOk("Sorry, since you have already learned Accessory Crafting, according to the association's rules, you can only learn one crafting skill.");
				cm.dispose();
				return;
			}
			// Check if the player already knows Equipment Crafting
			if (cm.getPlayer().getProfessionLevel(92020000) > 0) {
				cm.sendOk("You have already learned the Equipment Crafting skill. You can click on the Equipment Crafting Anvil next to you to see the relevant content.");
				cm.dispose();
				return;
			}
			// Check if the player knows Mining
			if (cm.getPlayer().getProfessionLevel(92010000) == 0) {
				cm.sendOk("Without learning Mining, you can't learn Equipment Crafting. Without materials, it's impossible to continue... Go to Mining Master Nobun nearby and learn Mining first.");
				cm.dispose();
				return;
			}
			// Learn Equipment Crafting
			cm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(92020000), 0x1000000, 0, -1);
			cm.sendOk("Congratulations! You have learned Equipment Crafting. You can now craft weapons and armor.");
			break;
		case 2:
			// Forget Equipment Crafting
			if (cm.getPlayer().getProfessionLevel(92020000) > 0) {
				cm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(92020000), -1, 0, -1);
				cm.sendOk("You have now forgotten the Equipment Crafting skill. If you wish to learn it again, please come back to me.");
			}
			break;
	}
	cm.dispose();
}

