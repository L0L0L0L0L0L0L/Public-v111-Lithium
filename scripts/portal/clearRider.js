/*
	名字:	隱藏地圖
	地圖:	騎士的平原
	描述:	921110000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21610)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21619)).getStatus() < 1) {
		Packages.server.quest.MapleQuest.getInstance(21619).forceStart(pi.getPlayer(), 0, 0);
		pi.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		pi.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		}
		return false;
}