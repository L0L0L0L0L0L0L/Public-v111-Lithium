/*
	名字:	外星基地
	地圖:	逃生路線
	描述:	610040600
*/

function enter(pi) {
	if (!pi.getPlayer().itemQuantity(4033191)) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("You need a key to escape. Beat up aliens until you find one."));
		return false;
		}
		pi.cancelItem(2210065);
		pi.gainItem(4033191, -1);
		pi.getPlayer().changeMap(pi.getMap(610040700), pi.getMap(610040700).getPortal(2)); //逃生路線
		return true;
}