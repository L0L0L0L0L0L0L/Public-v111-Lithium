/*
	名字:	覺醒的魔族
	地圖:	覺醒的魔族
	描述:	燈泡
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29960).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<Awakened Demon> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<Awakened Demon> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}