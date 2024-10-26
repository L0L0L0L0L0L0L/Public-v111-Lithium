/*
	名字:	稱號-十字獵人大師
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
		qm.sendNext("We've been watching your progress closely. #h0#. We've seen you rise to the challenge again and again, and I think I speak on behalf of all the crusaders that it's an honor to work with you. I hereby name you the #b<Silent Crusade Champion>#k.");
		break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Equip item inventory is full."));
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1647)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(1647).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("You have obtained the <Silent Crusade Champion> title."));
			qm.gainItem(1142354, 1);
			}
			qm.sendPrev("No matter what, we've got your back, #b<Silent Crusade Champion>#k.");
			break;
	case 2:
		qm.dispose();
}
}