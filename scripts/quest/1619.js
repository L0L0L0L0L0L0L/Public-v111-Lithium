/*
	名字:	[十字獵人]路德斯湖派遣
	地圖:	補給品倉庫
	描述:	931050500
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 3) {
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
		qm.sendYesNo("Our goal is to defend Maple World from the Mystic Gates that have appeared throughout the land. Are you ready to begin your first mission?");
		break;
	case 1:
		qm.sendNext("I've heard reports of a Mystic Gate near Ludus Lake. Meet #bSodane#k at the #r#m220040200##k. He'll fill you in.");
		break;
	case 2:
		qm.sendYesNo("Please go now.");
		break;
	case 3:
		qm.sendNext("Good luck, young Crusader!");
		break;
	case 4:
		Packages.server.quest.MapleQuest.getInstance(1619).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}