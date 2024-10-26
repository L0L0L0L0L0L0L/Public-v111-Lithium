/*
	名字:	新葉城 市區街道
	地圖:	新葉城-市區中心
	描述:	600000000
*/

function enter(pi) {
	cal = java.util.Calendar.getInstance();
	hour = cal.get(java.util.Calendar.HOUR_OF_DAY);
	if (hour < 7 || hour > 16) {
		pi.getPlayer().changeMap(pi.getMap(683000000), pi.getMap(683000000).getPortal(3));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Traveler, the Gate of Sweet Cake Hill is closed at the moment. Please prepare for the next event. See you around!"));
		return false;
}