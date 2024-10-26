/*
	名字:	善良的孩子
	地圖:	弓箭手村
	描述:	100000000
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29934).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<Well-Behaved Child> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<Well-Behaved Child> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}