/*
	名字:	武陵道場
	地圖:	武陵道場
	描述:	925020000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21745)).getStatus() > 1 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21747)).getStatus() < 2) {
		pi.getPlayer().changeMap(pi.getMap(925040000), pi.getMap(925040000).getPortal(2)); //武陵道場後路
		}
		return false;
}