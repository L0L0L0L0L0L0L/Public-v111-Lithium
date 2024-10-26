/*
	名字:	小乳牛
	地圖:	鯨魚號牛舍
	描述:	912000100
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2905)).getCustomData() == null) {
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2905)).setCustomData("00");
		}
		var progress = cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2905)).getCustomData();
		var slot = cm.getNpc() - 1092094;
		var ch = progress[slot];
	if (ch == '1') {
		cm.sendOk("The Baby Cow is full and happy.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().itemQuantity(4033019)) {
		var nextProgress = progress.substr(0, slot) + '1' + progress.substr(slot + 1);
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2905)).setCustomData(nextProgress);
		cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2905)), true);
		cm.sendNext("The Baby Cow is chowing down on the Hay like there's no tomorrow. it must've been hungry.");
		}
		cm.dispose();
}