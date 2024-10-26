/*
	名字:	黑暗時間神殿
	地圖:	時間神殿迴廊1
	描述:	272010000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31178)).getStatus() != 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Unable to enter without permission from the goddess."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(272010100), pi.getMap(272010100).getPortal(1)); //時間神殿迴廊2
		return true;
}