/*
	Name: Nobun
	Map: Professional Skill Village <Meister Town>
	Description: 910001000
*/

function start() {
	if (cm.getPlayer().getProfessionLevel(92010000) > 0)
		cm.sendSimple("You can't just randomly hit any rock with a pickaxe while mining. There are special veins for gems and ores.\r\n#L0##b100 pieces of #v4011010# exchange for #v2028067##l\r\n#L1#Abandon Mining (You will lose all mining experience/levels)#l");
	else
		cm.sendSimple("I am the mining expert, Nobun.\r\n#L2##bLearn Mining#l\r\n#L3#Hear about #eMining#n#l");
}

function action(mode, type, selection) {
	switch (selection) {
		case 0:
			if (cm.getPlayer().itemQuantity(4011010) < 100) {
				cm.sendOk("You need 100 pieces of #v4011010# ore fragments.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
				cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough space in the Use items inventory."));
				cm.dispose();
				return;
			}
			cm.sendOk("Thank you for your contribution to the mining profession.");
			cm.gainItem(2028067, 1);
			cm.gainItem(4011010, -100);
			break;
		case 1:
			if (cm.getPlayer().getProfessionLevel(92020000) > 0 || cm.getPlayer().getProfessionLevel(92030000) > 0) {
				cm.sendOk("Since you have learned Equipment Forging/Accessory Crafting, you cannot abandon mining for now.");
				cm.dispose();
				return;
			}
			cm.sendOk("You have now forgotten the Mining skill. If you wish to relearn it, please come see me again.");
			cm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(92010000), -1, 0, -1);
			break;
		case 2:
			if (cm.getPlayer().getProfessionLevel(92000000) > 0) {
				cm.sendOk("You can only learn one gathering skill, and you have already chosen Herbalism.");
				cm.dispose();
				return;
			}
			cm.sendOk("You have now learned the Mining skill. You can click on the mining machine nearby to check the related contents.");
			cm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(92010000), 0x1000000, 0, -1);
			cm.gainItem(1512000, cm.getPlayer().itemQuantity(1512000) ? 0 : 1);
			break;
		case 3:
			cm.sendOk("Mining is a skill that uses tools like pickaxes to collect ores from the map. The collected ores can be smelted using anvils sold by Muns to obtain materials needed for equipment and accessories.");
	}
	cm.dispose();
}
