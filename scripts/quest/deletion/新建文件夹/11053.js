/*
	名字:	大亂鬥勝利的主角
	地圖:	戰鬥廣場
	描述:	960000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
		qm.sendNext("Where's all your confidence? This stuff is easy!");
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
		qm.sendNext("Hello, #h0#! I am Rosette, the Battle Square guide. Right now, I am handing out gifts to those who complete challenges.");
		break;
	case 1:
		qm.sendAcceptDecline("You want a mission? Okay, I've got a mission for you. You have to win 3 Team matches throughout the day. How does that sound? You can do that, right?");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(11053).forceStart(qm.getPlayer(), qm.getNpc(), null);
		Packages.server.quest.MapleQuest.getInstance(11056).forceStart(qm.getPlayer(), qm.getNpc(), 0);
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
		qm.sendNext("Hey, you did it! I had a feeling you could handle 3 wins. Nothing to it, right? 'Course not. So, here's your gift. I'm sure it'll come in handy.");
		break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Etc item inventory is full."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(11053).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4310015, 1);
			qm.dispose();
}
}