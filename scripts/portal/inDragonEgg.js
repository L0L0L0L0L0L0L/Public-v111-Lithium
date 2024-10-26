/*
	名字:	潘姆之路
	地圖:	農場中心地
	描述:	100030300
*/

function enter(pi) {
	var map = pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22005)).getStatus() == 1 ? 900020100 : 100030301; //茂盛的森林
	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(1));
	return true;
}