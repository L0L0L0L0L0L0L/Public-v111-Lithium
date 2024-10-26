/*
	名字:	福爾摩沙
	地圖:	7層8層 B區域
	描述:	103040410
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != 103040420) {
		var map = pi.getPlayer().getMap().getId() + 10;
		pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(2));
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2288)).getStatus() != 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You cannot access this area."));
		return false;
		}
	if (pi.getMap(103040430).getCharacters().size() != 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.getMap(103040430).resetFully();
		pi.getPlayer().changeMap(pi.getMap(103040430), pi.getMap(103040430).getPortal(1)); //7層8層 D區域
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(103040420));
		return true;
}