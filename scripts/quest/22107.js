/*
	名字:	龍魔導士第8次轉職
	地圖:	龍魔導士第8次轉職
	描述:	龍魔導士第8次轉職
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(22107).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(22107));
	qm.getPlayer().changeJob(2216);
	qm.dispose();
}