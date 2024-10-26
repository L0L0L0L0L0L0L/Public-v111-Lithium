/*
	Name: Stache
	Map: Professional Skill Village <Meister Town>
	Description: 910001000
*/

function start() {
	if (cm.getPlayer().getProfessionLevel(92000000) > 0)
		cm.sendSimple("When gathering herbs, please do so with a heart that loves plants.\r\n#L0##b100x #v4022023# exchange for #v2028066##l\r\n#L1#Forget Herbalism (You will lose all Herbalism experience/levels)#l");
	else
		cm.sendSimple("Do you want to learn Herbalism? You're welcome to.\r\n#L2##bLearn Herbalism#l\r\n#L3#Hear about #eHerb Gathering#n#l");
}

function action(mode, type, selection) {
	switch (selection) {
	case 0:
		if (cm.getPlayer().itemQuantity(4022023) < 100) {
			cm.sendOk("You need 100x #v4022023# herbs.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough space in the Use items inventory."));
			cm.dispose();
			return;
			}
			cm.sendOk("Thank you for your contribution to Herbalism.");
			cm.gainItem(2028066, 1);
			cm.gainItem(4022023, -100);
			break;
	case 1:
		if (cm.getPlayer().getProfessionLevel(92040000) > 0) {
			cm.sendOk("You have learned Alchemy, so you cannot abandon Herbalism at this time.");
			cm.dispose();
			return;
			}
			cm.sendOk("You have now forgotten the Herbalism skill. If you wish to relearn it, please come see me again.");
			cm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(92000000), -1, 0, -1);
			break;
	case 2:
		if (cm.getPlayer().getProfessionLevel(92010000) > 0) {
			cm.sendOk("You can only learn one gathering skill, and you have already chosen Mining.");
			cm.dispose();
			return;
			}
			cm.sendOk("You have now learned the Herbalism skill. You can click on the Herb Gathering Pot nearby to check the related contents.");
			cm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(92000000), 0x1000000, 0, -1);
			cm.gainItem(1502000, cm.getPlayer().itemQuantity(1502000) ? 0 : 1);
			break;
	case 3:
		cm.sendOk("Herb gathering is a skill that uses tools like shovels to collect herbs from the map. After gathering, you can refine the herbs in an oil bottle sold by Muns to get materials needed for Alchemy.");
		}
		cm.dispose();
}
