/*
	名字:	前代達克魯的日記
	地圖:	前代達克魯的房間
	描述:	910350100
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2369)).getCustomData() == 1) {
	if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your etc. inventory."));
		cm.dispose();
		return;
		}
		cm.sendNext("You've obtained the Former Dark Lord's Diary. You better leave before someone comes in.");
		cm.gainItem(4032617, cm.getPlayer().itemQuantity(4032617) ? 0 : 1);
		cm.dispose();
		return;
		}
		cm.sendYesNo("You see a dust-covered diary. Do you wish to take the diary?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		for (var i = 0; i < 6; i++)
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001019), new java.awt.Point(-150 + (Math.random() * 350), 148));
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2369)).setCustomData(1);
		}
		cm.dispose();
}