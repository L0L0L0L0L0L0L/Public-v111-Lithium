/*
	名字:	精靈之林
	地圖:	盛開的森林1
	描述:	101050200
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24077)).getStatus() == 1) {
	if (pi.getMap(910150230).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This field is already in use. Try again later, or change channels and try again."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(910150230), pi.getMap(910150230).getPortal(1)); //被被佔領的精靈森林
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(101050200));
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(101050020), pi.getMap(101050020).getPortal(1)); //精靈之島
		return true;
}