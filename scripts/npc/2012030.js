/*
	名字:	豎琴弦&amp;lt;Do&gt;
	地圖:	艾利傑的庭園
	描述:	920020000
*/

chen = ["7", "8", "16", "17", "23", "24", "35", "36"];

hui = ["8", "9", "17", "18", "24", "25", "36", "37"];

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3114)).getStatus() == 1) {
		for (var i = 0; i < chen.length; i++)
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3114)).getCustomData() == chen[i]) {
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3114)).setCustomData(hui[i]);
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("orbis/pa", 4));
		cm.dispose();
		return;
		}
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3114)).setCustomData("");
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The performance was a failure. Elliza seems very displeased."));
		}
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("orbis/pa", 4));
		cm.dispose();
}