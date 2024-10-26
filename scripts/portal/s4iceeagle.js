/*
	名字:	艾納斯島
	地圖:	危險的絕壁
	描述:	211040700
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(6242)).getStatus() != 1) {
		return false;
		}
	if (pi.getMap(921100210).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.getMap(921100210).resetFully();
		pi.getPlayer().changeMap(pi.getMap(921100210), pi.getMap(921100210).getPortal(1));
		pi.getPlayer().startMapTimeLimitTask(300, pi.getMap(211040700));
		return true;
}