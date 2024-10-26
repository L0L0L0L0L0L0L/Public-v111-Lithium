/*
	名字:	帕必歐
	地圖:	可疑的美髮店
	描述:	931010030
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case - 1:
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
		if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
			cm.sendNext("What are you suddenly doing here? The hair salon is closed now, get out of here!");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23979)).getStatus() > 0) {
			cm.sendNext("There's nothing to talk about anymore. If this continues, the hair salon is almost closing down!");
			cm.dispose();
			return;
			}
			cm.sendNext("What are you doing?! How dare you try to destroy theFirebombs l worked so hard to obtain! Do you realizehow expensive these are? l paid an exorbitant amount ofmoney so that ! could learn a new perm!!");
			break;
	case 1:
		cm.sendNextPrev("What? You've come in the name of the Watchmen tokeep an eye on me? l don't even have the freedom topursue beautiful hair?! l won't stand for this! I'm going torequire compensation for the damage you've caused!");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(23979).forceStart(cm.getPlayer(), 0, 1);
		cm.dispose();
}
}