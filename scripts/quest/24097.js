/*
	名字:	變異菇菇的血
	地圖:	粗岩地帶
	描述:	102020400
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24097)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(24097).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("This is Arcon's Blood...");
			break;
	case 1:
		qm.sendNextPrev("...Huh? Winston told you that I will give you something? ...Unfortunately, I don't have anything to give you, though I can increase your fame. \r\n#fUI/UIWindow.img/QuestIcon/8/0# 1742 exp \r\n\r\n#fUI/UIWindow.img/QuestIcon/6/0# 3");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(24097).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().addFame(3);//人氣
		qm.gainItem(4033075, -1);
		qm.gainExp(1742);
		qm.dispose();
}
}