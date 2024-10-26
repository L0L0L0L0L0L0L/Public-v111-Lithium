/*
	名字:	巴洛古的寺院
	地圖:	神殿底層
	描述:	105100100
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(1022002) == 1) {
		pi.getPlayer().changeMap(pi.getMap(102000000), pi.getMap(102000000).getPortal(15));
		pi.updateInfoQuest(1022002, 0);
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You cannot use this portal."));
		return false;
}