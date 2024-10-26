/*
	名字:	黑暗的勇士
	地圖:	黑暗的勇士
	描述:	燈泡
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29961).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<Dark Hero> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<Dark Hero> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}