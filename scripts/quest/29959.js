/*
	名字:	黑暗契約者
	地圖:	黑暗契約者
	描述:	燈泡
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29959).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<Dark Warrior> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<Dark Warrior> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}