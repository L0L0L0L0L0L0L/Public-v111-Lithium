/*
	名字:	小胖
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
		if (cm.getPlayer().getInfoQuest(23999).indexOf("exp4=1") != -1) {
			cm.sendNext("Drats. Might as well eat another piece of candy.");
			cm.dispose();
			return;
			}
			cm.sendNext("D'oh! You found me. But I'm tiny! Are you a professional at this game or something? \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 3 exp");
			break;
	case 1:
		cm.dispose();
		cm.gainExp(3);
		cm.getPlayer().updateInfoQuest(23999, cm.getPlayer().getInfoQuest(23999) + ";exp4=1");
}
}