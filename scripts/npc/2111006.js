/*
	名字:	派溫
	地圖:	閒人勿入
	描述:	261020401
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3321)).getStatus() == 1 || cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3354)).getStatus() == 2) {
		cm.sendNext("Okay, since you're here, let's stop sweating the small stuff and start talking about something fun!");
		cm.dispose();
		return;
		}
	if (!((cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3320)).getStatus() > 0 && cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3321)).getStatus() < 1) || (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3353)).getStatus() > 0 && cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3354)).getStatus() < 1))) {
		cm.dispose();
		return;
		}
		cm.sendAcceptDecline("Hmmm... How did you get out? l believe you have some more things to take care of there... I'll send you back right now.");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNext("Hmmm... If you don't want to, then there's nothing I can do.");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(926120200), cm.getMap(926120200).getPortal(0));
		}
		cm.dispose();
}