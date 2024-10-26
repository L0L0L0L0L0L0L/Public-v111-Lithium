/*
	名字:	豎琴弦&amp;lt;Do&gt;
	地圖:	艾利傑的庭園
	描述:	920020000
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3114)).getStatus() == 1) {
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3114)).setCustomData("");
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The performance was a failure. Elliza seems very displeased."));
		}
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("orbis/si", 4));
		cm.dispose();
}