/*
	名字:	毒霧森林
	地圖:	濃霧森林
	描述:	930000300
*/

function enter(pi) {
	eim = pi.getPlayer().getEventInstance();
	if (eim.getProperty("1st") == null) {
		eim.setProperty("1st", (Math.random() < 0.5) ? "001E" : "001S");
		}
		portal = eim.getProperty("1st") == pi.getPortal().getName() ? "02st" : "01st";
		pi.getPlayer().changeMap(pi.getMap(930000300), pi.getMap(930000300).getPortal(portal));
		return true;
}