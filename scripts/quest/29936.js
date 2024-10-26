/*
	名字:	墮落城市名譽市民
	地圖:	墮落城市
	描述:	103000000
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29936).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<Kerning City Honorary Citizen> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<Kerning City Honorary Citizen> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}