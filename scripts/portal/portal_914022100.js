/*
	名字:	隱藏地圖
	地圖:	像刀刃的絕壁
	描述:	914022100
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21303)).getStatus() != 1 || pi.getPlayer().itemQuantity(4032339)) {
		return false;
		}
	if (pi.getMap(914022200).getCharactersSize() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.getMap(914022200).resetFully();
		pi.getPlayer().changeMap(pi.getMap(914022200), pi.getMap(914022200).getPortal(1)); //盜賊鸚鵡領域
		return true;
}