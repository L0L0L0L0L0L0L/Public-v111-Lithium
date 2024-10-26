/*
	名字:	名譽捷運站工作人員
	地圖:	維多利亞港
	描述:	104000000
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29931).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<Honorary Employee> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You have earned the <Honorary Employee> title. You can receive a Medal from NPC Dalair."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}