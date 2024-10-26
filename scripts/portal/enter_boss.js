/*
	名字:	外星基地
	地圖:	外星基地走廊 6
	描述:	610040230
*/

function enter(pi) {
	if (pi.getMap(610040300).getCharacters().size() < 1) {
		pi.getMap(610040300).resetFully();
		pi.getPlayer().changeMap(pi.getMap(610040300), pi.getMap(610040300).getPortal(0)); //外星基地電梯
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
}