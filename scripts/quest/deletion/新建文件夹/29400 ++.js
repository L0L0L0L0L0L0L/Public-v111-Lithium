/*
	名字:	精明的獵人
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
		qm.sendAcceptDecline("#v1142004# #e#b#t1142004##k\r\n\r\n-Time Limit 30 Days\r\n-Hunt 100,000 Monsters#n\r\n\r\n*Only monsters that are at your level or higher are approved. \r\n\r\nDo you want to test your skills to see if you're worthy of this title?");
		break;
	case 1:
		qm.sendNext("I'll give you 30 days to reach your hunting goal. Once you are finished, come back and see me. Remember, you have to come back and see me within the time limit in order to be approved. Also, you are prohibited from trying out for another title unless you first complete or forfeit this challenge.");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(29400).forceStart(qm.getPlayer(), qm.getNpc(), 0);
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
		if (status < 2) {
		qm.sendNext("Keep working at it.");
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
		qm.sendSimple("The number of monsters you hunted is " + qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(29400)).getCustomData() + " and the goal is 100000. What would you like to do?" + "" + (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(29400)).getCustomData() < 100000 ? "" : "\r\n#L0##bl want to receive the regular medal.#l") + "\r\n#L1##bl want to forfeit the challenge.#l");
		break;
	case 1:
		if (selection == 0) {
			qm.sendAcceptDecline("You hunted 100000 monsters... You've reached your goal of 100000 monsters. What an amazing accomplishment. Do you wish to receive the #b#eVeteran Hunter Medal#n#k?");
			}
		if (selection == 1) {
			qm.sendAcceptDecline("You don't want to try anymore? If you want to go for another title quest, you have to quit this quest first.");
			}
			select = selection;
			break;
	case 2:
		if (select == 1) {
			Packages.server.quest.MapleQuest.getInstance(29400).forfeit(qm.getPlayer());
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendOk("Make sure you have enough space in the Equip window of your Item Inventory.");
			qm.dispose();
			return;
			}
			qm.sendNext("On behalf of the God of Honor, I, Dalair, declare you as the newest owner of this honorable title. If you want to try out for another title, come back and see me anytime.");
			break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(29400).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("Veteran Hunter Medal obtained."));
		qm.gainItem(1142004, 1);
}
}