/*
	名字:	雪毛怪人的憤怒-發現線索
	地圖:	雪精靈之谷
	描述:	211040102
*/

var status = -1;

function start(mode, type, selection) {
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3108)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(3108).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(3108));
			qm.gainExp(3010);
			}
			qm.sendNext("(The statue is utterly beautiful, even from afar. It is so pure and transparent, as if it were made by ice, but it's not. I took a walk around the statue to look into it.)");
			break;
	case 1:
		qm.sendPrev("(A part of the statue is broken. There are big footsteps around.");
		break;
	case 2:
		qm.dispose();
}
}