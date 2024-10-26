/*
	名字:	克里塞的拯救者
	地圖:	克里塞村
	描述:	200100010
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29948).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(29948));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<Chryse Savior> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<Chryse Savior> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}