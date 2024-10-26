/*
	名字:	塔古斯
	地圖:	瑞德弟的陷阱
	描述:	922030100
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
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
		cm.sendNext("You must be Mercedes.");
		break;
	case 1:
		cm.sendNextPrevS("Who are you? Where is the Flame of Revival?", 2);
		break;
	case 2:
		cm.sendNextPrev("Flame of what? Oh... Ha! Is that how he got you to come here? There's no such thing as a Flame of Revival, you foolish Elf!");
		break;
	case 3:
		cm.sendNextPrevS("Audish...tricked me?", 2);
		break;
	case 4:
		cm.sendNextPrev("Such a simple mind you have! Anyway, this conversation has gone on long enough.");
		break;
	case 5:
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(24084).forceComplete(cm.getPlayer(), 0);
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300432), new java.awt.Point(-135, 492));
		cm.dispose();
}
}