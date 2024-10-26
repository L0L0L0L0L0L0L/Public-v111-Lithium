/*
	名字:	萬人迷
	地圖:	訓練場
	描述:	120000104
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2915)).getStatus() == 1) {
		cm.getPlayer().changeMap(cm.getMap(912040100), cm.getMap(912040100).getPortal(1));
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2916)).getStatus() == 1) {
		cm.getPlayer().changeMap(cm.getMap(912040200), cm.getMap(912040200).getPortal(1));
		cm.dispose();
		return;
		}
		cm.sendOk("The Training Room is off-limits unless you are scheduled.");
		cm.dispose();
}