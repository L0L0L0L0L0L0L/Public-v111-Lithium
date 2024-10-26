/*
	名字:	詹姆士的下落（３）
	地圖:	中央城塔
	描述:	106021201
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
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
		qm.sendYesNo("Okay, it's time to use the #bHelmet Pepe's Helmet#k that #b#h0##k brought me to escape. I'll escape first, so please watch my back, okay? Again, thank you so much! I'll be sure to tell my brother about you.");
		break;
	case 1:
		qm.sendNext("Thank you so much. Let me put on this disguise before we start.");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(2327).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.showNpcSpecialEffect(1300008, "hat");
		qm.gainExp(1600);
		qm.dispose();
}
}