/*
	名字:	被破壞的歷恩森林
	地圖:	做夢的森林小徑
	描述:	271010400
*/

function enter(pi) {
	pi.getPlayer().changeMap(pi.getMap(271010500), pi.getMap(271010500).getPortal(1)); //被破壞的六條岔道
	return true;
}