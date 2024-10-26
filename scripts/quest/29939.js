/*
	名字:	龍之主
	地圖:	寶貝龍
	描述:	寶貝龍
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29939).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<Dragon Master> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<Dragon Master> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}