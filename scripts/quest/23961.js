/*
	名字:	我是沒有感情的玩偶
	地圖:	第1礦場
	描述:	310050400
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 3) {
		qm.sendNext("That is not an acceptable answer. If you have some reason not to help me, please talk to #p2154006#.");
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
		qm.sendNext("I am not human. I am #o8105003#. I am a machine without feelings. That is why I do not feel fear. I am perfect for guarding dark underground tunnels.");
		break;
	case 1:
		qm.sendNextPrevS("You kind of look human though...", 2);
		break;
	case 2:
		qm.sendNextPrev("Do I? I, however, do not produce energy by consuming food. I absorb the energy of others and convert that to bionic energy. In other words, I kill other organisms and steal their energy.");
		break;
	case 3:
		qm.sendNextPrevS("#b(That's kinda scary...)", 2);
		break;
	case 4:
		qm.sendAcceptDecline("I do not have much energy remaining. An Energy Cartridge replacement is required. In order to achieve operational efficiency, you must charge my cartridge while I stand guard.");
		break;
	case 5:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.sendNext("Please empty one Etc slot.");
			qm.dispose();
			return;
			}
			qm.gainItem(4220178, qm.getPlayer().itemQuantity(4220178) ? 0 : 1);
			Packages.server.quest.MapleQuest.getInstance(23961).forceStart(qm.getPlayer(), qm.getNpc(), null);
			Packages.server.quest.MapleQuest.getInstance(23980).forceStart(qm.getPlayer(), qm.getNpc(), 0);
			qm.sendOk("I've given you my Energy Cartridge. Bring it back to me when you've filled it with energy. Energy will automatically flow into the cartridge when you hunt monsters.");
			break;
	case 6:
		qm.dispose();
}
}

function end(mode, type, selection) {
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
		qm.sendNext("I will check if the Energy Cartridge has been fully charged. Verification complete. You've successfully completed the mission.");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23961)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(23961).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4220178, -1);
			qm.gainExp(109800);
			}
			qm.sendPrev("Thank you. The reserve cartridge is fully charged. Yes, it was a reserve. The cartridge currently in use is at full capacity. I tricked you. I have been told it is foolish not to snatch up opportunities when they present themselves...");
			break;
	case 2:
		qm.dispose();
}
}