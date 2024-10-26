/*
	名字:	獅子王城
	地圖:	第二座塔
	描述:	211060400
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3140)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(211060500), pi.getMap(211060500).getPortal(1)); //城牆下3
		return true;
		}
		pi.openNpc(2161002);
		return true;
}