/*
	名字:	稱號-正式十字獵人
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
		qm.sendNext("Lora tells me you made quick work of the #bKing Centipede#k. I think it's time I promoted you to #b<Silent Crusade Officer>.");
		break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Equip item inventory is full."));
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1645)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(1645).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("You have obtained the <Silent Crusade Officer> title."));
			qm.gainItem(1142352, 1);
			}
			qm.sendPrev("Congratulations on becoming a #b<Silent Crusade Officer>#k! We're expecting great things from you.");
			break;
	case 2:
		qm.dispose();
}
}