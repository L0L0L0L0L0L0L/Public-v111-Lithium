/*
	名字:	卡蜜拉
	地圖:	石人寺院的入口
	描述:	910600000
*/

function start() {
	if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		cm.sendNext("That crazy golem kidnapped me and brought me here... I can't leave until that golem is destroyed!");
		cm.dispose();
		return;
		}
		cm.sendNext("You...you rescued me. Thank you... Now, let's get out of here.");
}

function action(mode, type, selection) {
	if (mode > 0) {
		Packages.server.quest.MapleQuest.getInstance(22598).forceStart(cm.getPlayer(), 0, 2);
		cm.getPlayer().changeMap(cm.getMap(100000000), cm.getMap(100000000).getPortal(0));
		}
		cm.dispose();
}