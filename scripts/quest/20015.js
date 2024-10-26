/*
	名字:	小女皇的問候
	地圖:	耶雷弗
	描述:	130000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 2) {
		qm.sendNext("You may be hesitant now, but I can see an incredible amount of courage behind your eyes. Close your eyes and feel the courage and passion inside of you.");
		qm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNext("Did you know? Maple World may look peaceful, but certain areas are filled with forces of darkness. The Black Mage and those who want to revive the Black Mage are threatening Maple World.");
		break;
	case 1:
		qm.sendNextPrev("We can't just sit here and do nothing while our enemies get stronger. Our own fear will only come back to haunt us.");
		break;
	case 2:
		qm.sendAcceptDecline("But I won't worry too much. Someone as determined as you will be able to protect Maple World from danger, right? If you are brave enough to volunteer to become one of the Knights, I know I can count on you. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v1142065# #t1142065# - 1");
		break;
	case 3:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20015)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your equip. inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(20015).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(20015));
			qm.gainItem(1142065, 1);
			}
			qm.sendNext("Heehee, I knew you'd say that. But you know you still have a ways to go before you can fight for Maple World, right?");
			break;
	case 4:
		qm.sendPrev("Neinheart, my Tactician, who is standing right next to me, will help you become an honorable Knight. I'll be looking forward to your progress. I'm counting on you!");
		break;
	case 5:
		qm.dispose();
}
}