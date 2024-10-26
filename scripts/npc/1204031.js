/*
	名字:	???
	地圖:	面臨危險的弓箭手教育園
	描述:	910050000
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
		cm.sendNextS("Hmm... Just as I heard from the Gentleman... Some nerve you're got, coming here. Whatever, I already have the information I need.", 1);
		break;
	case 1:
		cm.sendNextPrevS("Since you're here, I can eliminate you once and for all. You're been getting in the way of the Black Wings. Prepare to die, haha!", 1);
		break;
	case 2:
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300355), new java.awt.Point(-200, 181));
		cm.dispose();
}
}