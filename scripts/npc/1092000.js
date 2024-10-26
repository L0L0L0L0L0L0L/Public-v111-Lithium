/*
	名字:	湯寶寶
	地圖:	餐廳
	描述:	120000103
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2905)).getStatus() != 1) {
		cm.sendOk("嗯～ 我的料理可是與眾不同的喲！");
		cm.dispose();
		return;
		}
		cm.getPlayer().changeMap(cm.getMap(912000100), cm.getMap(912000100).getPortal(1));
		cm.dispose();
}