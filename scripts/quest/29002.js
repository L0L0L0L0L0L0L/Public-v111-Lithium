/*
	名字:	人氣王！
	地圖:	維多利亞港
	描述:	104000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("Come back when you're ready.");
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
		qm.sendAcceptDecline("#v1142003# #e#b#t1142003##k\r\n\r\n-Time Limit 30 Days\r\n-Increase your Fame by 1000#n\r\n\r\nDo you want to test your skills to see if you're worthy of this title?");
		break;
	case 1:
		qm.sendNext("I'll give you 30 days to reach your goal. Once you're finished, come back and see me. Remember, you have to come back and see me within the time limit in order to be approved. Also, you are prohibited from trying out for another title unless you first complete or forfeit this challenge.");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(29002).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
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
		if (qm.getPlayer().getFame() < 1000) {
			qm.sendOk("Your popularity has increased by " + qm.getPlayer().getFame() + " so far. Since you couldn't reach your goal, which was 1000, I'm afraid you don't qualify to receive this title...");
			qm.dispose();
			return;
			}
			qm.sendAcceptDecline("Seeing that your popularity has increased by " + qm.getPlayer().getFame() + ", you must have a lot of people who support you. Do you wish to accept #b#eCelebrity Medal#n#k?");
			break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendOk("Make sure you have enough space in the Equip window of your Item Inventory.");
			qm.dispose();
			return;
			}
			qm.gainItem(1142003, 1);
			Packages.server.quest.MapleQuest.getInstance(29002).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(29002));
			qm.sendNext("On behalf of the God of Honor, I, Dalair, declare you as the newest owner of this honorable title. If you want to try out for another title, come back and see me anytime.");
			break;
	case 2:
		qm.dispose();
}
}