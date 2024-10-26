/*
	名字:	聯盟的一員
	地圖:	聯盟的一員
	描述:	燈泡
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
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("It seems I cannot give you the mark of the alliance... Care to empty a slot in your inventory?", 1105000);
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(29964)).getStatus() < 2) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<A Member of The Maple Alliance> has been rewarded."));
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<A Member of The Maple Alliance> has been rewarded."));
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(29964));
			Packages.server.quest.MapleQuest.getInstance(29964).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(1142355, 1);
			}
			qm.sendNext("And thanks to the First Continental Conference, the #bMaple Alliance#k is born.", 1105000);
			break;
	case 1:
		qm.sendNextPrev("We all had our doubts, even I. But now, here we are, together.", 1105000);
		break;
	case 2:
		qm.sendPrev("The real fight is just beginning. We must strive to resolve our misunderstandings and unite as one.", 1105000);
		break;
	case 3:
		qm.dispose();
}
}