/*
	名字:	毒霧森林
	地圖:	濃霧森林
	描述:	930000300
*/

function enter(pi) {
	eim = pi.getPlayer().getEventInstance();
	if (eim.getProperty("10st") == null) {
		eim.setProperty("10st", (Math.random() < 0.3) ? "010N" : (Math.random() < 0.5) ? "010E" : "010W");
		}
		portal = eim.getProperty("10st") == pi.getPortal().getName() ? "11st" : "01st";
		pi.getPlayer().changeMap(pi.getMap(930000300), pi.getMap(930000300).getPortal(portal));
		return true;
}