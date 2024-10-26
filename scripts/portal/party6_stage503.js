/*
	名字:	毒霧森林
	地圖:	濃霧森林
	描述:	930000300
*/

function enter(pi) {
	eim = pi.getPlayer().getEventInstance();
	if (eim.getProperty("3st") == null) {
		eim.setProperty("3st", (Math.random() < 0.5) ? "003W" : "003S");
		}
		portal = eim.getProperty("3st") == pi.getPortal().getName() ? "05st" : "01st";
		pi.getPlayer().changeMap(pi.getMap(930000300), pi.getMap(930000300).getPortal(portal));
		return true;
}