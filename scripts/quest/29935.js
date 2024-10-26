/*
	名字:	勇士之村守衛兵
	地圖:	奇幻村
	描述:	105000000
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29935).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<Perion Guard> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<Perion Guard> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}