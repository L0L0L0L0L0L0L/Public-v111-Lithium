/*
	名字:	修煉騎士
	地圖:	耶雷弗
	描述:	130000000
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29906).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<Knight-in-Training> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<Knight-in-Training> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}