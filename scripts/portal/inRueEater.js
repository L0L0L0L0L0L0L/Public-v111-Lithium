/*
	名字:	可疑的入口
	地圖:	危險的狸貓巢穴
	描述:	310050520
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23970)).getStatus() == 1) {
		pi.openNpc(2159304);
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23971)).getStatus() == 1) {
	if (pi.getPlayer().itemQuantity(4032782)) {
		var em = pi.getEventManager("EscapePlans");
		var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		em.startInstance(pi.getPlayer());
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "There seems to be a problem. Come back later."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The door is locked."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You do not need to enter."));
		return false;
}