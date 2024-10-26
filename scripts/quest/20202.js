/*
	名字:	烈焰巫師的騎士等級試煉
	地圖:	耶雷弗
	描述:	130000000
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("Eh? Why? Is there something wrong?");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20202)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(20202).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("So you brought all of Proof of Test... Okay, I believe that you are now qualified to become an official knight. Do you want to become one?");
			break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20202)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your equip. inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(20202).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(1210);
			qm.removeAll(4032097);
			qm.gainItem(1142067, 1);
			qm.getPlayer().gainSP(1, 1);
			}
			qm.sendNext("The knight-in-training has ended. You are now an official knight of the Knights of Cygnus.");
			break;
	case 2:
		qm.sendNextPrev("I have given you some #bSP#k. I have also given you a number of skills for a Soul Master that's only available to knights, so I want you to work on it and hopefully cultivate it as much as your soul.");
		break;
	case 3:
		qm.sendPrev("Now that you are officially a Knight of cygnus, act like one so you will keep Goodness's name up high.");
		break;
	case 4:
		qm.dispose();
}
}