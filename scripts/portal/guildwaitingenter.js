/*
	名字:	威廉的古堡
	地圖:	守護之峽谷
	描述:	990000000
*/

function enter(pi) {
	var em = pi.getEventManager("GuildQuest");
	if (em.getProperty("state") > 0) {
		pi.getPlayer().changeMap(pi.getMap(990000100), pi.getMap(990000100).getPortal(0));
		}
		return false;
}