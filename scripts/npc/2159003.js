/*
	名字:	俊
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
		if (cm.getPlayer().getInfoQuest(23999).indexOf("exp1=1") != -1) {
			cm.sendNext("Did you find Ulrika and Von yet? Von is really, really good at hiding.");
			cm.dispose();
			return;
			}
			cm.sendNext("Eep! You found me.");
			break;
	case 1:
		cm.sendNextPrev("Eh, I wanted to go further into the wagon, but my head wouldn't fit.");
		break;
	case 2:
		cm.sendNextPrev("Did you find Ulrika and Von yet? Von is really, really good at hiding. \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 5 exp");
		break;
	case 3:
		cm.dispose();
		cm.gainExp(5);
		cm.getPlayer().updateInfoQuest(23999, cm.getPlayer().getInfoQuest(23999) + ";exp1=1");
}
}