/*
	名字:	生命之穴
	地圖:	第一個迷宮室
	描述:	240050101
*/

function enter(pi) {
                var stage = pi.getPlayer().getMap().getId() - 240050100;
	if (pi.getPlayer().getMap().getId() == 240050105) {
		pi.getPlayer().changeMap(pi.getMap(240050100), pi.getMap(240050100).getPortal(0));
		return true;
		}
	if (pi.getPlayer().getMap().getReactorByName("passKey" + stage).getState() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The portal is not opened yet."));
		return false;
		}
		map = pi.getPlayer().getMap().getId() +1;
		pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(0));
		return true;
}