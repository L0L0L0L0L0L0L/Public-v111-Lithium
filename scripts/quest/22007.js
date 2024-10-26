/*
	名字:	收集雞蛋
	地圖:	前院
	描述:	100030102
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
		qm.sendNext("Hm? That's strange. The Incubator wasn't installed properly. Try again.");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22007)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(22007).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("Oh, did you bring the Egg? Here, give it to me. I'll give you the Incubator then.");
			break;
	case 1:
		qm.sendYesNo("Alright, here you go. I have no idea how you use it, but it's yours... \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 360 exp");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(22007).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.getEvanTutorial("UI/tutorial/evan/9/0"));
		qm.gainItem(4032451, -1);
		qm.gainExp(360);
		qm.dispose();
}
}