/*
	名字:	未來之門
	地圖:	未來之門
	描述:	271000000
*/

function start() {
	if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31102)).getStatus() != 1) {
		ms.dispose();
		return;
		}
		ms.sendNextS(".................!!!", 5, 2143002);
}

function action(mode, type, selection) {
	if (mode > 0) {
		ms.sendNextS("Shinsoo? Why? It seemed like he was trying to say\r\nsomething... I better head deeper into the future. What\r\ncould Shinsoo have been trying to say?", 3);
		Packages.server.quest.MapleQuest.getInstance(31102).forceComplete(ms.getPlayer(), 0);
		}
		ms.dispose();
}