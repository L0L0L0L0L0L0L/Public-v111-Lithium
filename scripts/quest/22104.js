/*
	名字:	龍魔導士第5次轉職
	地圖:	龍魔導士第5次轉職
	描述:	龍魔導士第5次轉職
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(22104).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(22104));
	qm.getPlayer().changeJob(2213);
	qm.dispose();
}