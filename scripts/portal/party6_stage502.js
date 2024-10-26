/*
	名字:	毒霧森林
	地圖:	濃霧森林
	描述:	930000300
*/

function enter(pi) {
	eim = pi.getPlayer().getEventInstance();
	if (eim.getProperty("2st") == null) {
		eim.setProperty("2st", (Math.random() < 0.3) ? "002W" : (Math.random() < 0.5) ? "002E" : "002S");
		}
		portal = eim.getProperty("2st") == pi.getPortal().getName() ? "03st" : "01st";
		pi.getPlayer().changeMap(pi.getMap(930000300), pi.getMap(930000300).getPortal(portal));
		return true;
}