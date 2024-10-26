/*
	名字:	龍魔導士第6次轉職
	地圖:	龍魔導士第6次轉職
	描述:	龍魔導士第6次轉職
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(22105).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(22105));
	qm.getPlayer().changeJob(2214);
	qm.dispose();
}