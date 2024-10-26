/*
	名字:	黑路
	地圖:	死路森林
	描述:	914000300
*/

function enter(pi) {
	var map = pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21001)).getStatus() < 1 ? 914000220 : 914000400; //燃燒的森林3
	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(2));
	return true;
}