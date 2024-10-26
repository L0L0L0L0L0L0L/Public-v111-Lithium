/*
	名字:	發生變化的樹叢
	地圖:	變形的提魯森林
	描述:	271000200
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31119)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(31119).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNextS("You look strangely familiar. Have we met? Wh-why are you looking at me like that...? Hmm. I don't know what you're talking about. I've never been the sort of pathetic girl who crouches by herself in the hill north of Henesys. Don't be stupid.", 1);
			break;
	case 1:
		qm.sendNextPrevS("Ah, Alex mentioned you. Hmm. You don't seem that strong, though. Come by later, and maybe I'll figure out a use for you.", 1);
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(31119).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.dispose();
}
}