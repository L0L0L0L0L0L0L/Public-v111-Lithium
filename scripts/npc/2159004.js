/*
	名字:	烏利卡
	地圖:	人煙稀少的石山
	描述:	931000001
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
		if (cm.getPlayer().getInfoQuest(23999).indexOf("exp2=1") != -1) {
			cm.sendNext("Have you found Jun and Von yet? Von's going to be pretty hard to find. Better keep your eyes open.");
			cm.dispose();
			return;
			}
			cm.sendNext("Haha, you found me. Guess l should've found a better hiding spot.");
			break;
	case 1:
		cm.sendNextPrev("Have you found Jun and Von yet? Von's going to be pretty hard to find. Better keep your eyes open. \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 5 exp");
		break;
	case 2:
		cm.dispose();
		cm.gainExp(5);
		cm.getPlayer().updateInfoQuest(23999, cm.getPlayer().getInfoQuest(23999) + ";exp2=1");
}
}