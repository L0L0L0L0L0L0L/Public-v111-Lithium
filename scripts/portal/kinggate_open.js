/*
	名字:	威廉的古堡
	地圖:	死亡迴廊
	描述:	990000800
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getReactorByName("kinggate").getState() > 0) {
		pi.getPlayer().changeMap(pi.getMap(990000900), pi.getMap(990000900).getPortal(1)); //惡靈13的王座
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "This door is closed."));
		return false;
}