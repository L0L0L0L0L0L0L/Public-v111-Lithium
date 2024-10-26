/*
	Name: Kant
	Map: Dangerous Sea Center
	Description: 923040300
*/

function start() {
	if (cm.getPlayer().getMap().getId() == 923040300) {
		cm.sendYesNo("I'm so moved, finally someone has come to rescue me! The sea monster Hydrus in the nearby cave has caused unusual waves in the once calm ocean, so we need to stop it as soon as possible.");
	}
	if (cm.getPlayer().getMap().getId() == 923040400 && cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		cm.sendOk("To maintain the ecological balance of the ocean, please defeat the Hydrus in the cave.");
		cm.dispose();
		return;
	}
	cm.sendYesNo("Has Hydrus really been defeated? This place is so terrifying. Thank you very much for your help. Please accept this commemorative gift.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v4001535# #t4001535# 1");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getMap().getId() == 923040300) {
			cm.getPlayer().changeMap(cm.getMap(923040400), cm.getMap(923040400).getPortal(0));
			cm.dispose();
			return;
		}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Insufficient slots in the Other Items inventory"));
			cm.dispose();
			return;
		}
		cm.gainNX(2000);
		cm.addTrait("will", 26);
		cm.addTrait("charm", 26);
		cm.gainItem(4001535, 1);
		cm.getPlayer().changeMap(cm.getMap(923040000), cm.getMap(923040000).getPortal(0));
	}
	cm.dispose();
}
