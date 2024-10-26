/*
	名字:	櫻花處的精靈
	地圖:	伟大精灵降临
	描述:	910150100
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29953).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<Elf of Elluel> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<Elf of Elluel> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}