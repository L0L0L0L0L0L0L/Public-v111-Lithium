/*
	名字:	補給品箱子
	地圖:	研究所C-4區
	描述:	931050417
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1628)).getStatus() == 1 && cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1641)).getCustomData() != "bomb")  {
		Packages.server.quest.MapleQuest.getInstance(1641).forceStart(cm.getPlayer(), 0, "bomb");
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("crossHunter/bomb", 3));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("cannonshooter/Attack3", 4));
		}
		cm.dispose();
}