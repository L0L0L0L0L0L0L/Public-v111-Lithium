/*
	名字:	女皇的騎士團長
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
		if (status > 1) {
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
		qm.sendNext("#h0#... First of all, thank you for your great work. If it weren't for you, I... I wouldn't be safe from the curse of Black Witch. Thank you so much.");
		break;
	case 1:
		qm.sendNextPrev("If nothing else, this chain of events makes one thing crystal clear; you have put in countless hours of hard work to better yourself and contribute to the Cygnus Knights.");
		break;
	case 2:
		qm.sendAcceptDecline("To celebrate your hard work and accomplishments... I would like to award you a new title. Will you... accept this?");
		break;
	case 3:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("Oh no, you're carrying so many items in your item inventory that I can't give you Captain Knight. How about unloading a number of items so you can receive this reward from me?");
			qm.dispose();
			return;
			}
			qm.gainItem(1142069, 1);
			qm.getPlayer().changeJob(qm.getPlayer().getJob() + 1);
			Packages.server.quest.MapleQuest.getInstance(20408).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(20408));
			qm.sendOk("#h0#. For courageously battling the Black Mage, I will appoint you as the new Chief Knight of Cygnus Knights from this moment forward. Please use your power and authority wisely to help protect the citizens of Maple World.");
			break;
	case 4:
		qm.dispose();
}
}