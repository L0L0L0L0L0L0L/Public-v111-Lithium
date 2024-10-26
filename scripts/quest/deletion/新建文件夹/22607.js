/*
	名字:	意想不到的禮物I
	地圖:	寶貝龍
	描述:	寶貝龍
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(22607).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}