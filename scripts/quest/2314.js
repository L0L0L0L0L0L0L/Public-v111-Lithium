/*
	名字:	菇菇森林探險（１）
	地圖:	菇菇森林路口
	描述:	106020000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendOk("Please do not give up on the Mushking Empire!");
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
		qm.sendYesNo("In order to rescue the princess, you must first investigate the Mushroom Forest. King Pepe has somehow set up a powerful barrier preventing anyone from entering the castle. Please investigate this mater for us right away.");
		break;
	case 1:
		qm.sendNext("You'll run into the barrier in the Mushroom Forest if you head over to the east from your current location. Please be careful, though. From what I've heard, the area is infested with many atrocious monsters.");
		break;
	case 2:
		qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2314)).setStatus(1);
		qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2314)), true);
		qm.dispose();
}
}