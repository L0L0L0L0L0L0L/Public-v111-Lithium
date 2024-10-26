/*
	名字:	弓箭手村
	地圖:	弓箭手培訓中心
	描述:	100000201
*/

function enter(pi) {
	var em = pi.getEventManager("q24071");
	var prop = em.getProperty("state");
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24071)).getStatus() == 1 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24095)).getCustomData() != 1) {
	if (prop == null || prop == 0) {
		em.startInstance(pi.getPlayer());
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This Story Quest is too busy at the moment. Please try again later."));
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Please try again in a moment, or change channels and try again."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(100000000), pi.getMap(100000000).getPortal(14));
		return true;
}