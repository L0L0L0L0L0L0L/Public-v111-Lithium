/*
	名字:	毒霧森林
	地圖:	濃霧森林
	描述:	930000300
*/

function enter(pi) {
	eim = pi.getPlayer().getEventInstance();
	if (eim.getProperty("5st") == null) {
		eim.setProperty("5st", (Math.random() < 0.3) ? "005N" : (Math.random() < 0.5) ? "005E" : "005S");
		}
		portal = eim.getProperty("5st") == pi.getPortal().getName() ? "06st" : "01st";
		pi.getPlayer().changeMap(pi.getMap(930000300), pi.getMap(930000300).getPortal(portal));
		return true;
}