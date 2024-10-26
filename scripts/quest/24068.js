/*
	名字:	尋找赫麗娜
	地圖:	魔法森林
	描述:	101000000
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24068)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(24068).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("Are you hear to become a Bowman? No, that's not right. Your face... It can't be...!");
			break;
	case 1:
		qm.sendNextPrev("Mercedes?!");
		break;
	case 2:
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.getEvanTutorial("UI/tutorial/mersedes/0/0"));
		break;
	case 3:
		qm.sendNext("I knew you were still alive! I KNEW it! I never believed for a second that the...that the Black Mage could stop you. \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 2500 exp");
		break;
	case 4:
		Packages.server.quest.MapleQuest.getInstance(24068).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainExp(2500);
		qm.dispose();
}
}