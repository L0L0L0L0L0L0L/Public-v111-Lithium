/*
	名字:	北部森林
	地圖:	綠樹的藤條
	描述:	101030100
*/

function enter(pi) {
	if (pi.getPlayer().itemQuantity(4031346)) {
		pi.getPlayer().changeMap(pi.getMap(pi.getPlayer().getMap().getId() == 240010100 ? 101030100 : 240010100), pi.getMap(pi.getPlayer().getMap().getId() == 240010100 ? 101030100 : 240010100).getPortal(pi.getPlayer().getMap().getId() == 240010100 ? "minar00" : "elli00"));
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "A Magic Seed has been used, and you're now being transported somewhere else."));
		pi.gainItem(4031346, -1);
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Unable to warp due to the lack of a Magic Seed."));
		return false;
}