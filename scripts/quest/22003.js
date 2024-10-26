/*
	名字:	送便當
	地圖:	客廳
	描述:	100030101
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("Good kids listen to their mothers. Now, Evan, be a good kid and talk to me again.");
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
		qm.sendAcceptDecline("Your #bDad#k forgot his Lunch Box when he left for the farm this morning. Will you #bdeliver this Lunch Box#k to your Dad in #b#m100030300##k, honey?");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22003)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.sendNext("Oh, Evan, my dear. What have you got there? You don't have enough slots in your Etc window.");
			qm.dispose();
			return;
			}
			qm.gainItem(4032448, qm.getPlayer().itemQuantity(4032448) ? 0 : 1);
			Packages.server.quest.MapleQuest.getInstance(22003).forceStart(qm.getPlayer(), qm.getNpc(), null);
			}
			qm.sendNext("Heehee, my Evan is such a good kid! Head #bleft after you exit the house#k. Rush over to your dad. I'm sure he's starving.");
			break;
	case 2:
		qm.sendNextPrev("Come back to me if you happen to lose the Lunch Box. I'II make his lunch again.");
		break;
	case 3:
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.getEvanTutorial("UI/tutorial/evan/5/0"));
		qm.dispose();
}
}