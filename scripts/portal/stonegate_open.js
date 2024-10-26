/*
	名字:	威廉的古堡
	地圖:	騎士大廳
	描述:	990000400
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("stonegate").getState() > 0) {
		pi.getPlayer().changeMap(pi.getMap(990000430), pi.getMap(990000430).getPortal(1)); //信念之室
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The gate is closed."));
		return false;
}