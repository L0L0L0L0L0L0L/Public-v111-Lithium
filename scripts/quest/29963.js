/*
	名字:	協助完成夢想的恩人
	地圖:	墮落廣場站
	描述:	103020020
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
		qm.sendOk("Thank you for taking your time to help me. I know it wasn't easy. You've got a really kind heart. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v1142356# #t1142356# 1 \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 1000 exp");
		break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Equip item inventory is full."));
			qm.dispose();
			return;
			}
			qm.gainExp(1000);
			qm.gainItem(1142356, 1);
			Packages.server.quest.MapleQuest.getInstance(29963).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("< Star Maker > has been rewarded."));
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "< Star Maker > has been rewarded."));
			qm.sendOk("I'll always remember the great adventurer who helped me achieve my goals. From now on, everyone will know you as the #b<Star Maker>#k!");
			qm.dispose();
}
}