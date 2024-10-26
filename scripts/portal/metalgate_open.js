/*
	名字:	威廉的古堡
	地圖:	信念之室
	描述:	990000430
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("metalgate").getState() > 0) {
		pi.getPlayer().changeMap(pi.getMap(990000431), pi.getMap(990000431).getPortal(1)); //承諾之室
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "This way forward is not open yet."));
		return false;
}