/*
	名字:	龍魔導士第3次轉職
	地圖:	龍魔導士第3次轉職
	描述:	龍魔導士第3次轉職
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(22102).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(22102));
	qm.getPlayer().changeJob(2211);
	qm.dispose();
}