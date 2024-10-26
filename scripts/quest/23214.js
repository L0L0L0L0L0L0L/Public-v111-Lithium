/*
	名字:	和莫斯提馬的對練
	地圖:	艾德斯塔公園噴水台附近2
	描述:	931050110
*/

var status = -1;

function start(mode, type, selection) {
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
		qm.sendNext("There! That's my original form from the past. Oh, I looked so good.");
		break;
	case 1:
		qm.sendNextPrev("Now, this copy won't be as powerful as I really was. It's just a reflection, after all. Still, it should give you a decent challenge. Oh, and if you want to repeat this, you have to forfeit the quest and start over. It's a pain, but that's the rule.");
		break;
	case 2:
		if (qm.getMap(931050120).getCharacters().size() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23214).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.getMap(931050120).resetFully();
			qm.getPlayer().changeMap(qm.getMap(931050120), qm.getMap(931050120).getPortal(1));
			qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001038), new java.awt.Point(714, -14));
			qm.dispose();
			return;
			}
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Someone is already in this map, Better come back later."));
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
		qm.sendNext("I feel a lot of energy built up in you, #h0#. Don't you feel it yourself?");
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
		qm.sendYesNo("How was your training? If you feel like you learned something important, I can write it down for you.");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23214)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 3) {
			qm.sendOk("Please empty at least #b3 slots#k in your #bEquip tab#k, then try again.");
			qm.dispose();
			return;
			}
			qm.gainItem(1142343, 1);
			qm.gainItem(1322126, 1);
			qm.getPlayer().changeJob(3111);
			Packages.server.quest.MapleQuest.getInstance(23214).forceComplete(qm.getPlayer(), qm.getNpc());
			}
			qm.sendNext("I'm glad I could help you. Now, if you'll excuse me, I used up too much of my power, so I'm going to go pass out...");
			break;
	case 2:
		qm.sendPrev("I used too much power, that's why I turned red!");
		qm.dispose();
}
}