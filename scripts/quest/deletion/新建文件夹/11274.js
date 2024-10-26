/*
	名字:	不屈的冰騎士
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
		qm.sendNext("Really? It's not like it's hard...");
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
		qm.sendAcceptDecline("Today's mission is... You have to achieve 1 victory with the Ice Knight in Ice Knight Mode. This mission is not that hard, but it might be hard for you to achieve. But I know you, #h0#, will going to challenge it, right?");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(11274).forceStart(qm.getPlayer(), qm.getNpc(), null);
		Packages.server.quest.MapleQuest.getInstance(11059).forceStart(qm.getPlayer(), qm.getNpc(), 0);
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
		qm.sendNext("Wow? Already? You completed the mission, Achieve 1 victory with the Ice Knight in Ice Knight Mode. How are you feeling? It wasn't that hard, right? Alright then, I will give you a gift as I promised.");
		break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Etc item inventory is full."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(11274).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4310015, 1);
			qm.dispose();
}
}