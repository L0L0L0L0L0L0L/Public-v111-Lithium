/*
	Name: Adventurer Trapped in the City
	Map: Instructor's Room
	Description: 921160700
*/

function start() {
	if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		cm.sendOk("Hero, I am trapped here by them. Please defeat Instructor Ani first to ensure it is safe to escape.");
		cm.dispose();
		return;
	}
	cm.sendYesNo("I never expected to have a chance to live and escape this prison. I am very grateful for your help. Please accept this commemorative gift.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v4001534# #t4001534# 1");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Insufficient slots in the Other Items inventory"));
			cm.dispose();
			return;
		}
		cm.gainNX(2000);
		cm.gainItem(4001534, 1);
		cm.getPlayer().changeMap(cm.getMap(921160000), cm.getMap(921160000).getPortal(0));
	}
	cm.dispose();
}
