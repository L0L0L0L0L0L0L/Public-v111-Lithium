/*
	名字:	甦醒的狂狼勇士
	地圖:	瑞恩村
	描述:	140000000
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29924).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<Awakened Aran> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<Awakened Aran> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}