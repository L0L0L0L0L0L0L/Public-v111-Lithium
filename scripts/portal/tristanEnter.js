/*
	名字:	巴洛古的寺院
	地圖:	神殿底層
	描述:	105100100
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2238)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(105100101), pi.getMap(105100101).getPortal(1)); //崔斯坦的墳墓
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Tristan's Spirit: You do not have what it takes to leave this place yet."));
		return false;
}