/*
	名字:	神之冒險家
	地圖:	維多利亞港
	描述:	104000000
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29903).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<Master Adventurer> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<Master Adventurer> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}