/*
	名字:	希望中的狂狼勇士
	地圖:	瑞恩村
	描述:	140000000
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29927).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<Aran in Hope> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<Aran in Hope> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}