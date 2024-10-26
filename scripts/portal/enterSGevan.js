/*
	名字:	水泥路
	地圖:	埃德爾斯坦公園3
	描述:	310020200
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22612)).getStatus() > 1 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22614)).getStatus() < 2) {
		pi.getPlayer().changeMap(pi.getMap(931050710), pi.getMap(931050710).getPortal(1)); //公園一角
		}
		return false;
}