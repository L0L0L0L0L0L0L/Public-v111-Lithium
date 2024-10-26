/*
	名字:	精靈的英雄
	地圖:	伟大精灵降临
	描述:	910150100
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29955).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<Elven Hero> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<Elven Hero> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}