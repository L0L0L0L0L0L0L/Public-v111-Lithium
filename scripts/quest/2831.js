/*
	名字:	義安的憤怒
	地圖:	勇士之村
	描述:	102000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("Why not? You're the one who brought it to me!");
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
		qm.sendYesNo("I guess I'll give it a try!");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2831)).getStatus() < 1) {
			qm.getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9100011), new java.awt.Point(2175, 1262));
			Packages.server.quest.MapleQuest.getInstance(2831).forceStart(qm.getPlayer(), qm.getNpc(), null);
			}
			qm.sendNext("#b(An Orange Mushroom appears!)#k Wh-what's that? \r\nAAAAAH!!");
			break;
	case 2:
		cm.sendPrev("How COULD she?! I'm really scared of Orange Mushrooms! I was attacked by a giant Orange Mushroom when I was little! Did 10 Boogies do this? Or was it YOU? Or was it that rascal #bBlackbull#k again?!");
		break;
	case 3:
		qm.dispose();
}
}