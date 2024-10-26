/*
	名字:	獅子王城
	地圖:	第三座塔
	描述:	211060600
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3141)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(211060700), pi.getMap(211060700).getPortal(1)); //城牆下4
		return true;
		}
		pi.openNpc(2161002);
		return true;
}