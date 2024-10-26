/*
	名字:	第一個魔法陣
	地圖:	黑魔法師的研究室
	描述:	261040000
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3345)).getStatus() != 1) {
		cm.sendOk("No change occurred. Maybe it's just a drawing on the wall...");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3345)).getCustomData() > 0) {
		cm.dispose();
		return;
		}
	if (!cm.getPlayer().itemQuantity(4031739)) {
		cm.sendNext("You do not have an item that can be exchanged with the Magic Pentagram.");
		cm.dispose();
		return;
		}
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The first Magic Pentagram has reacted."));
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3345)).setCustomData(1);
		cm.showNpcSpecialEffect(2111020, "act33451");
		cm.gainItem(4031739, -1);
		cm.dispose();
}