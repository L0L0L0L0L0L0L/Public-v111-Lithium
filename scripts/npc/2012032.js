/*
	名字:	豎琴弦&amp;lt;Do&gt;
	地圖:	艾利傑的庭園
	描述:	920020000
*/

chen = ["4", "5", "32", "33", "39", "40"];

hui = ["5", "6", "33", "34", "40", "41"];

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3114)).getStatus() == 1) {
		for (var i = 0; i < chen.length; i++)
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3114)).getCustomData() == chen[i]) {
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3114)).setCustomData(hui[i]);
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("orbis/la", 4));
		cm.dispose();
		return;
		}
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3114)).setCustomData("");
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The performance was a failure. Elliza seems very displeased."));
		}
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("orbis/la", 4));
		cm.dispose();
}