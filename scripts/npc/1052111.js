/*
	名字:	地鐵垃圾桶
	地圖:	沿著軌道
	描述:	103020100
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2857)).getStatus() == 1) {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2857)).getCustomData() == null) {
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2857)).setCustomData("0000");
		}
		var progress = cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2857)).getCustomData();
		var slot = cm.getNpc() - 1052109;
		var ch = progress[slot];
	if (ch == '0') {
		var nextProgress = progress.substr(0, slot) + '1' + progress.substr(slot + 1);
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2857)).setCustomData(nextProgress);
		cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2857)), true);
		}
		}
		cm.sendOk("It's a nondescript trash can that can be found anywhere in the streets. A simple nudge might trigger a stream of cockroaches from it. I'll just leave it alone.");
		cm.dispose();
}