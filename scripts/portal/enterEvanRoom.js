/*
	名字:	猶他家
	地圖:	客廳
	描述:	100030101
*/

function enter(pi) {
	if (pi.getPlayer().getJob() != 2001 || pi.getPlayer().getJob() < 2210 && pi.getPlayer().getJob() >2218) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This is Evan's room. Only those who have been invited can enter."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(100030100), pi.getMap(100030100).getPortal(1)); //小閣樓
		return true;
}