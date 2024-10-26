/*
	名字:	獅子王城
	地圖:	第一座塔
	描述:	211060200
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3139)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(211060300), pi.getMap(211060300).getPortal(2)); //城牆下2
		return true;
		}
		pi.openNpc(2161002);
		return true;
}