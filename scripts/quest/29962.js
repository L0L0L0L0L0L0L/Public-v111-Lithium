/*
	名字:	復仇的化身
	地圖:	復仇的化身
	描述:	燈泡
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29962).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<Vengeance Incarnate> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<Vengeance Incarnate> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}