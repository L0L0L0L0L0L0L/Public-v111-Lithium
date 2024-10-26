/*
	名字:	神聖的石頭
	地圖:	潮濕的沼澤
	描述:	105010100
*/

var map = Array(105010100, 105020000, 105020100, 105020300, 105020200, 105020400);

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2236)).getStatus() == 1) {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2236)).getCustomData() == null) {
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2236)).setCustomData("000000");
		}
	for (var i = 0; i < map.length; i++)
	if (cm.getPlayer().getMap().getId() == map[i]) {
		var slot = i;
		}
		var progress = cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2236)).getCustomData();
		var ch = progress[slot];
	if (ch == '1') {
		cm.sendNext("The power of the charm remains in place.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().itemQuantity(4032263)) {
		var next = progress.substr(0, slot) + '1' + progress.substr(slot + 1);
		cm.gainItem(4032263, -1);
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2236)).setCustomData(next);
		cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2236)), true);
		}
		}
		cm.dispose();
}