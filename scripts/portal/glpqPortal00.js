/*
	名字:	組隊任務
	地圖:	團結的測試
	描述:	610030500
*/

function enter(pi) {
	var y = pi.getPlayer().getJob();
	if (y > 100 && y < 140 || y > 1100 && y < 1120 || y > 2000 && y < 2120 || y > 3100 && y < 3120) {
		pi.getPlayer().changeMap(pi.getMap(610030510), pi.getMap(610030510).getPortal(1)); //戰士專精的房間
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Only warriors may enter this portal."));
		return false;
}