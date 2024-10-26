/*
	名字:	那因哈特救援
	地圖:	被破壞的弓箭手村
	描述:	271010000
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31146)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(31146).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
			qm.sendOk("First, please defeat the Knights who are keeping watch over me. I can't say anything more until they're dispatched.");
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31146)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(31146).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainExp(11659200);
			}
			qm.sendNext("Thank you for saving me, but I'll remain here. My disappearance would only make things worse. Besides, I should be able to do some good from here.");
			break;
	case 1:
		qm.sendNextPrev("Please tell Alex my decision.");
		break;
	case 2:
		qm.sendPrev("And please..stop her. There's no way to get the old Cygnus back. We only have one option...");
		break;
	case 3:
		qm.dispose();
}
}