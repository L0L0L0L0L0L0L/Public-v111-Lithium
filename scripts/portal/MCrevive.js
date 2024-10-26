/*
	名字:	怪物擂台賽
	地圖:	擂台賽場地&amp;lt;復活之章&gt;
	描述:	980000102
*/

function enter(pi) {
	map = pi.getPlayer().getMap().getId() - 1;
	portal = pi.getPlayer().getCarnivalParty().getTeam() == 0 ? "red_revive" : "blue_revive";
	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(portal));
	return true;
}