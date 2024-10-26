/*
	名字:	怪物擂台賽
	地圖:	擂台賽場地3&amp;lt;復活之章&gt;
	描述:	980000302
*/

function enter(pi) {
	var portal = pi.getPlayer().getCarnivalParty().getTeam() == 0 ? 4 : 3;
	pi.getPlayer().changeMap(pi.getMap(980000301), pi.getMap(980000301).getPortal(portal)); //擂台賽場地3&amp;lt;戰場&gt;
	return true;
}