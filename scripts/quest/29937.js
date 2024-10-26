/*
	名字:	秘密團體臨時成員
	地圖:	通天塔&amp;lt;秘密房间&gt
	描述:	200080601
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29937).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<Secret Organization Temporary Member> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<Secret Organization Temporary Member> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}