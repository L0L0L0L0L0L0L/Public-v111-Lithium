/*
	名字:	崔斯坦的繼承人
	地圖:	崔斯坦的墳墓
	描述:	105100101
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2244)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(2244).forceStart(qm.getPlayer(), qm.getNpc(), 0);
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2244)).getCustomData() < 200) {
			qm.sendOk("Respect doesn't come easily. If you want to call yourself my successor, you'll have to keep working hard. \r\n\r\n#bBalrog Kill Count: " + qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2244)).getCustomData() + " / 200");
			qm.dispose();
			return;
			}
			qm.sendNext("Impressive! You've defeated the Balrog 200 times! You've earned the right to call yourself my successor. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v1142079# #t1142079#");
			break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendOk("Check to see if you have at least one empty slot in your Equip tab.");
			qm.dispose();
			return;
			}
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<Tristan's Successor> has been rewarded."));
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<Tristan's Successor> has been rewarded."));
			Packages.server.quest.MapleQuest.getInstance(2244).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(1142079, 1);
			qm.dispose();
}
}