/*
	名字:	雷德拓
	地圖:	危險！臨時機場
	描述:	931000420
*/

function start() {
	if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		cm.dispose();
		return;
		}
	if (!cm.getPlayer().itemQuantity(4032745)) {
		cm.sendNext("Have you seen anything falling on the ground? It's best to take one and ask Surl if he has seen it before.");
		cm.dispose();
		return;
		}
		cm.sendNext("Whew, we're safe now. Lets trade the water now.");
}

function action(mode, type, selection) {
	if (mode > 0) {
		Packages.server.quest.MapleQuest.getInstance(23131).forceStart(cm.getPlayer(), 0, 1);
		cm.getPlayer().changeMap(cm.getMap(310000010), cm.getMap(310000010).getPortal(0));
		}
		cm.dispose();
}