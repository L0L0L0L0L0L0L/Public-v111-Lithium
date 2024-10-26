/*
	名字:	終極冒險家
	地圖:	耶雷弗
	描述:	130000000
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
		qm.sendNext("Hello, Chief Knight. Currently, Maple World is in great danger. We need a bigger army to protect this place from the Black Mage. And to build a stronger army, I decided to ally with the Explorer Chiefs. We created the Ultimate Explorer with our combined powers.");
		break;
	case 1:
		qm.sendYesNo("The Ultimate Explorer starts at Lv. 50 and is born with very special skills. Would you like to be reborn as an Ultimate Explorer?");
		break;
	case 2:
		if (!qm.getClient().canMakeCharacter(qm.getPlayer().getWorld())) {
			qm.sendOk("You cannot make a character without a character slot.");
			qm.dispose();
			return;
			}
			qm.sendUltimateExplorer();
			qm.dispose();
}
}