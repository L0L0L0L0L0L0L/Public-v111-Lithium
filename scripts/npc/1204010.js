/*
	名字:	塔古斯
	地圖:	被封印的庭園
	描述:	920030001
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
		cm.sendNext("Wait... Who are you exactly?");
		break;
	case 1:
		cm.sendNextPrev("Come to think of it, I did hear that the puppeteer was attacked in Victoria Island. Are you the one responsible for that attack?");
		break;
	case 2:
		cm.sendNextPrev("Ah, good news for me! In the process of taking the #bSeal Stone of Orbis#k, I can also defeat you and emerge victorious. If I defeat you, it'll be as if I defeated the puppeteer as well! I'll destroy you!");
		break;
	case 3:
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300348), new java.awt.Point(625, 83));
		cm.dispose();
}
}