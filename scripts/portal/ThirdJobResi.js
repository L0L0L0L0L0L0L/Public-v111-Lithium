/*
	名字:	雷本礦山
	地圖:	發電廠保安隊
	描述:	310050100
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23033)).getStatus() == 1 || pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23034)).getStatus() == 1 || pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23035)).getStatus() == 1) {
	if (pi.getMap(931000200).getCharacters().size() < 1) {
		pi.getMap(931000200).resetFully();
		pi.getPlayer().changeMap(pi.getMap(931000200), pi.getMap(931000200).getPortal(1)); //3次轉職
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(310050100));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This field has already been taken by someone. Please try again later, or try a different channel."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24090)).getStatus() == 1) {
		var em = pi.getEventManager("q24090");
		var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		em.startInstance(pi.getPlayer());
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This field has already been taken by someone. Please try again later, or try a different channel."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "It's a Power Plant. It's probably not a good idea to go inside."));
		return false;
}