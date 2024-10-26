/*
	名字:	玩具城
	地圖:	雲彩陽台
	描述:	220010001
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(6230)).getStatus() == 1 || pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(6231)).getStatus() == 1 || pi.getPlayer().itemQuantity(4001110)) {
		pi.getPlayer().changeMap(pi.getMap(922020200), pi.getMap(922020200).getPortal(1)); //隱藏露台
		}
		return false;
}