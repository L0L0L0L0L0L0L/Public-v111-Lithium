/*
	名字:	玩具城
	地圖:	遺忘的迴廊
	描述:	220070400
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(6134)).getStatus() == 1) {
		pi.getPlayer().changeMap(pi.getMap(922020000), pi.getMap(922020000).getPortal(1)); //被遺忘的黑暗
		}
		return false;
}