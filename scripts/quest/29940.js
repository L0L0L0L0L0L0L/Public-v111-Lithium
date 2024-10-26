/*
	名字:	英雄的接班人
	地圖:	寂靜的洞穴
	描述:	914100021
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29940).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<Hero's Successor> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<Hero's Successor> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}