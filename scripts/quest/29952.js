/*
	名字:	曾經是英雄的人
	地圖:	伟大精灵降临
	描述:	910150100
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29952).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<A Hero, No More> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<A Hero, No More> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}