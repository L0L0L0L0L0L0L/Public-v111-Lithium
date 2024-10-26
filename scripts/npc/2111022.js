/*
	名字:	第三個魔法陣
	地圖:	黑魔法師的研究室
	描述:	261040000
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3345)).getStatus() != 1) {
		cm.sendOk("No change occurred. Maybe it's just a drawing on the wall...");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3345)).getCustomData() == null || cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3345)).getCustomData() == 1) {
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3345)).getCustomData() > 2) {
		cm.sendNext("This Magic Pentagram is already in control.");
		cm.dispose();
		return;
		}
	if (!cm.getPlayer().itemQuantity(4031741)) {
		cm.sendNext("There's no item that can be traded with the Rune Circle.");
		cm.dispose();
		return;
		}
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The third Magic Pentagram has reacted."));
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3345)).setCustomData(3);
		cm.showNpcSpecialEffect(2111022, "act33453");
		cm.gainItem(4031741, -1);
		cm.dispose();
}