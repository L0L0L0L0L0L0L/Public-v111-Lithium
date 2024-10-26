/*
	名字:	霧之海
	地圖:	第二次機會
	描述:	923020109
*/

function enter(pi) {
	var eim = pi.getPlayer().getEventInstance();
	if (eim != null && pi.getPlayer().getCarnivalParty() != null) {
		map = pi.getPlayer().getCarnivalParty().getTeam() == 0 ? 5 + parseInt(eim.getProperty("Red_Stage"))).getId() : 10 + parseInt(eim.getProperty("Blue_Stage"))).getId();
	if (eim.getProperty("Red_Stage").equals("B") || eim.getProperty("Blue_Stage").equals("B")) {
		map = eim.getMapInstance(5).getId();
		}
	if (eim.getProperty("Red_Stage").equals("BC") || eim.getProperty("Blue_Stage").equals("BC")) {
		map = eim.getMapInstance(0).getId();
		}
		pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(1));
		}
		return true;
}