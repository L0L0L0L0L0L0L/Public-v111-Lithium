/*
	名字:	龍魔導士第2次轉職
	地圖:	龍魔導士第2次轉職
	描述:	龍魔導士第2次轉職
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(22101).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(22101));
	qm.getPlayer().changeJob(2210);
	qm.gainItem(5620006, 1);
	qm.gainItem(5620007, 1);
	qm.gainItem(5620008, 1);
	qm.dispose();
}