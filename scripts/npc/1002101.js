/*
	名字:	坤
	地圖:	維多利亞港
	描述:	104000000
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22579)).getStatus() < 2) {
		cm.sendOk("I'm just a retired crewman. I'm focused on training powerful Explorers now.");
		cm.dispose();
		return;
		}
		cm.sendYesNo("Do you want to go to the island in John's Map right now?");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendOk("Ah, you still have businesses left in Lith Harbor.");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(200090080), cm.getMap(200090080).getPortal(0));
		cm.getPlayer().startMapTimeLimitTask(30, cm.getMap(914100000));
		}
		cm.dispose();
}