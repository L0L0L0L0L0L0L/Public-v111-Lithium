/*
	名字:	魔法森林
	地圖:	魔法森林
	描述:	101000000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20718)).getStatus() != 1 || pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20732)).getCustomData() == 1) {
		pi.getPlayer().changeMap(pi.getMap(101000003), pi.getMap(101000003).getPortal(8)); //魔法森林圖書館
		return true;
		}
	if (pi.getMap(910110000).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.getMap(910110000).resetFully();
		pi.getPlayer().changeMap(pi.getMap(910110000), pi.getMap(910110000).getPortal(1)); //魔法圖書館
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(101000000));
		return true;
}