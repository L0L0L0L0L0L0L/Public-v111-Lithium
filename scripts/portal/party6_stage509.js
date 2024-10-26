/*
	名字:	毒霧森林
	地圖:	濃霧森林
	描述:	930000300
*/

function enter(pi) {
	eim = pi.getPlayer().getEventInstance();
	if (eim.getProperty("9st") == null) {
		eim.setProperty("9st", (Math.random() < 0.5) ? "009E" : "009N");
		}
		portal = eim.getProperty("9st") == pi.getPortal().getName() ? "10st" : "01st";
		pi.getPlayer().changeMap(pi.getMap(930000300), pi.getMap(930000300).getPortal(portal));
		return true;
}