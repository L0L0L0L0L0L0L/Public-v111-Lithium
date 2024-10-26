/*
	名字:	闇黑龍王遺留下來的東西…
	地圖:	九靈龍巢穴
	描述:	240040612
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
		qm.sendOk("Kyuuu? Kaooo kyuuuuuh! \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v2041200# #t2041200# 1 \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 46700 exp");
		break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Use item inventory is full."));
			qm.dispose();
			return;
			}
			qm.sendOk("(Unable to understand exactly what the baby dragon is crying out loud, but just listening to it roar makes my skin tingle with joy and excitement at the prospect of it growing up to be the next dominant dragon in this area.)");
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(3714));
			Packages.server.quest.MapleQuest.getInstance(3714).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4001094, -1);
			qm.gainItem(2041200, 1);
			qm.gainExp(46700);
			qm.dispose();
}
}