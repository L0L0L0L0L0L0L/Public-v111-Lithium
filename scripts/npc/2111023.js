/*
	名字:	魔法陣中央
	地圖:	黑魔法師的研究室
	描述:	261040000
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3345)).getStatus() != 1) {
		cm.sendOk("No change occurred. Maybe it's just a drawing on the wall...");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3345)).getCustomData() > 3) {
		cm.sendNext("The Magic Pentagram may have finally settled down.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3345)).getCustomData() != 3) {
		cm.sendNext("Please operate this after controlling all three Magic Pentagrams.");
		cm.dispose();
		return;
		}
		cm.showNpcSpecialEffect(2111023, "act33454");
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3345)).setCustomData(4);
		cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3345)), true);
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The Magic Pentagram is starting to light up."));
		cm.dispose();
}