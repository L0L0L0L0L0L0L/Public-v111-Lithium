/*
	名字:	暗夜行者的騎士等級試煉
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
		qm.sendNext("What's holding you back?");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20204)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(20204).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("So you brought all the Proof of Exams with you. This is much b... way, I shouldn't congratulate you for doing something that you should be doing. At least, I can tell that you are now qualified to become an official knight. Do you want to become one right now?");
			break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20204)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your equip. inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(20204).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(1410);
			qm.removeAll(4032099);
			qm.gainItem(1142067, 1);
			qm.getPlayer().gainSP(1, 1);
			}
			qm.sendNext("You are no longer a Knight-in-Training. You have officially become a Cygnus Knight.");
			break;
	case 2:
		qm.sendNextPrev("I have given you some #bSP#k. I have also given you some skills of Night Walker that are only available to official knights, so keep working!");
		break;
	case 3:
		qm.sendPrev("As a member of the Cygnus Knights, I hope you remain unaffected by temptations and stay strong.");
		break;
	case 4:
		qm.dispose();
}
}