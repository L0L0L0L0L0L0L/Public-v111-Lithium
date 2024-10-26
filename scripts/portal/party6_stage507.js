/*
	名字:	毒霧森林
	地圖:	濃霧森林
	描述:	930000300
*/

function enter(pi) {
	eim = pi.getPlayer().getEventInstance();
	if (eim.getProperty("7st") == null) {
		eim.setProperty("7st", (Math.random() < 0.3) ? "007W" : (Math.random() < 0.5) ? "007S" : "007N");
		}
		portal = eim.getProperty("7st") == pi.getPortal().getName() ? "09st" : "01st";
		pi.getPlayer().changeMap(pi.getMap(930000300), pi.getMap(930000300).getPortal(portal));
		return true;
}