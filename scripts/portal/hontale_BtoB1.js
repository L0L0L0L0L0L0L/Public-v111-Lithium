/*
	名字:	生命之穴
	地圖:	迷宮室
	描述:	240050100
*/

function enter(pi) {
	if (pi.getMap(240050100).getCharacters().size() == 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "As the last player on this map, you are compelled to wait for the incoming keys."));
		return false;
		}
	if (pi.getPlayer().itemQuantity(4001087)) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You cannot pass to the next map holding the 1st Crystal Key in your inventory."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(240050101), pi.getMap(240050101).getPortal(0)); //第一個迷宮室
		return true;
}