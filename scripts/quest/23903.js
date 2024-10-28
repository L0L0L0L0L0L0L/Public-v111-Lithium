/*
	名字:	可以幫助艾德斯塔嗎？
	地圖:	埃德爾斯坦
	描述:	310000000
*/

var status = -1;

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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23903)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23903).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("You've brought all the Light Bulbs. Thank you. I will let the other townspeople know that there are good people like you in the #p1101000# Knights.");
			break;
	case 1:
		qm.sendNextPrev("Years have passed since this town was taken over by the Black Wings, and the hearts of the townspeople have hardened more and more. Still, I'm sure they will be able to trust an upstanding person like you.");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(23903).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainItem(4000603, -40);
		qm.gainExp(3500);
		qm.dispose();
}
}