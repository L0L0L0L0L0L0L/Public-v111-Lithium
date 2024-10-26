/*
	名字:	威廉的古堡
	地圖:	地下水路
	描述:	990000600
*/

function enter(pi) {
	if (pi.getPlayer().getLevel() > 30) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You cannot proceed past this point."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(990000640), pi.getMap(990000640).getPortal(1)); //水路之迷宮
		return true;
}