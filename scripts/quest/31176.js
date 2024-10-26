/*
	名字:	阿卡伊農的下落
	地圖:	燃燒的神木村4
	描述:	272000410
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
		qm.sendNext("I was looking for you. I received a report from #p2144003# that you saved #p2144004#.");
		break;
	case 1:
		qm.sendNextPrevS("I did what needed to be done. You should also know that #p2144010# went to the Temple of Time, where the Black Mage remains imprisoned.", 2);
		break;
	case 2:
		qm.sendNextPrev("Has she? That was sooner than I expected. She must have found the remnant of #p2144010#...");
		break;
	case 3:
		qm.sendNextPrevS("...#p2144008#?!", 2);
		break;
	case 4:
		qm.sendNextPrev("Mwahaha, I wouldn't let you capture #p2144010# like this, you worm! Enjoy eternity in your new resting place!");
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(31176).forceStart(qm.getPlayer(), qm.getNpc(), null);
		Packages.server.quest.MapleQuest.getInstance(31187).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300487), new java.awt.Point(345, 2));
		qm.dispose();
}
}