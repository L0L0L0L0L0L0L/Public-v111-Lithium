/*
	名字:	[十字猎人]偶然？必然！
	地圖:	维修中的列车
	描述:	931050400
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
		qm.sendNextS("They're going to launch their attack any moment! We'll all be beaten if we let it happen! Take them down!", 1);
		break;
	case 1:
		for (var i = 0; i < 8; i++)
		qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300470), new java.awt.Point(-510 + (Math.random() * 600), -5));
		Packages.server.quest.MapleQuest.getInstance(1601).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}