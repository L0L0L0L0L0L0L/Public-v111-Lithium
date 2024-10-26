/*
	名字:	稱號-見習十字獵人
	地圖:	埃德爾斯坦
	描述:	310000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNext("Welcome to the Silent Crusade! I'd like you to have this #b<Silent Crusade Recruit>#k title.");
		break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Equip item inventory is full."));
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1644)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(1644).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("You have obtained the <Silent Crusade Recruit> title."));
			qm.gainItem(1142351, 1);
			}
			qm.sendPrev("Congratulations on joining the Silent Crusade! #h0# received the #b<Silent Crusade Recruit>#k title.");
			break;
	case 2:
		qm.dispose();
}
}