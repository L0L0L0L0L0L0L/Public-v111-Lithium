/*
	名字:	第二個魔法陣
	地圖:	黑魔法師的研究室
	描述:	261040000
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3345)).getStatus() != 1) {
		cm.sendOk("No change occurred. Maybe it's just a drawing on the wall...");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3345)).getCustomData() == null) {
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3345)).getCustomData() > 1) {
		cm.sendNext("This Magic Pentagram is already in control.");
		cm.dispose();
		return;
		}
	if (!cm.getPlayer().itemQuantity(4031740)) {
		cm.sendNext("You do not have an item that can be exchanged with the Magic Pentagram.");
		cm.dispose();
		return;
		}
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The second Magic Pentagram has reacted."));
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3345)).setCustomData(2);
		cm.showNpcSpecialEffect(2111021, "act33452");
		cm.gainItem(4031740, -1);
		cm.dispose();
}