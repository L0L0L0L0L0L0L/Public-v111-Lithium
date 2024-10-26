/*
	名字:	破風使者的騎士等級試煉
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
		qm.sendNext("Is there actually a reason why you should stay as a Knight-in-Training?");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20203)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(20203).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("Proof of Exam, I checked them all. I can tell you are now ready to make the leap as an official knight. Do you want to become one?");
			break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20203)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your equip. inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(20203).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(1310);
			qm.removeAll(4032098);
			qm.gainItem(1142067, 1);
			qm.getPlayer().gainSP(1, 1);
			}
			qm.sendNext("You are no longer a Knight-in-Training. You are now officially a Cygnus Knight.");
			break;
	case 2:
		qm.sendNextPrev("I have given you some #bSP#k. I have also given you some skills of Wind Archer that are only available to official knights, so keep working!");
		break;
	case 3:
		qm.sendPrev("As an official Cygnus Knight, you should always keep yourself level-headed.");
		break;
	case 4:
		qm.dispose();
}
}