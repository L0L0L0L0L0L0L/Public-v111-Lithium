/*
	名字:	閃雷悍將的騎士等級試煉
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
		qm.sendNext("Hmm? Why? What's holding you back?");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20205)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(20205).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("Oh, you brought all Proof of Exams! Haha, I knew you'd be good at it. Tell you what, I now commend you to become an official knight. Do you want to become one right now?");
			break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20205)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your equip. inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(20205).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(1510);
			qm.removeAll(4032100);
			qm.gainItem(1142067, 1);
			qm.getPlayer().gainSP(1, 1);
			}
			qm.sendNext("You are now no longer a Knight-in-Training. You have now officially become a Cygnus Knight.");
			break;
	case 2:
		qm.sendNextPrev("I have also given you some #bSP#k and the accompanying skills of a Thunder Breakers that are only available to the official knights These skills are lightning-based, so use them wisely!");
		break;
	case 3:
		qm.sendPrev("Well, personally, I hope you don't lose your enthusiasm even after becoming a Cygnus Knights. Always seek out the positive even if you're in the midst of a barrage of negative items.");
		break;
	case 4:
		qm.dispose();
}
}