/*
	名字:	毒霧森林
	地圖:	濃霧森林
	描述:	930000300
*/

function enter(pi) {
	eim = pi.getPlayer().getEventInstance();
	if (eim.getProperty("6st") == null) {
		eim.setProperty("6st", (Math.random() < 0.2) ? "006E" : (Math.random() < 0.3) ? "006S" : (Math.random() < 0.5) ? "006W" : "006N");
		}
		portal = eim.getProperty("6st") == pi.getPortal().getName() ? "07st" : "01st";
		pi.getPlayer().changeMap(pi.getMap(930000300), pi.getMap(930000300).getPortal(portal));
		return true;
}