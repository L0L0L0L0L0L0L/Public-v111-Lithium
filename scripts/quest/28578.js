/*
	名字:	Prize wheel
	地圖:	104000000
	描述:	維多利亞港
*/

var status = -1;

function end(mode, type, selection) {
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28578)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(28578).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("You got #z4031349#. According to the previous agreement, I prepared a gift for you. I hope you can have fun.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v5530172# #t5530172# 1 \r\n#v5530177# #t5530177# 1");
			break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.CASH).getNumFreeSlot() < 2) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please make room in your inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(28578).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28578)).setStatus(0);
			qm.gainItem(4031349, -1);
			qm.gainItem(5530172, 1);
			qm.gainItem(5530177, 1);
			qm.dispose();
}
}