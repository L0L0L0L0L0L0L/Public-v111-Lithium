/*
	名字:	奇怪的石像
	地圖:	奇幻村
	描述:	105000000
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2052)).getStatus() != 1 && cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2053)).getStatus() != 1 && cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2054)).getStatus() != 1) {
		cm.sendOk("I laid my hand on the statue but nothing happened.");
		cm.dispose();
		return;
		}
		cm.sendYesNo("Once I lay my hand on the statue, a strange light covers me and it feels like I am being sucked into somewhere else. ls it okay to be moved to somewhere else randomly just like that?");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNext("Once I took my hand off the statue it got quiet, as if nothing happened.");
		break;
	case 1:
		map = cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2052)).getStatus() == 1 ? 910530000 : cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2053)).getStatus() == 1 ? 910530100 : 910530200;
		cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
		}
		cm.dispose();
}