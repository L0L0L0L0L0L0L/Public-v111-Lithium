/*
	名字:	巴洛古的寺院
	地圖:	神殿底層
	描述:	105100100
*/

function enter(pi) {
	if (pi.getPlayer().getInfoQuest(1022002) == 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("You cannot enter through here. Use the portal on the bottom left."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(105100000), pi.getMap(105100000).getPortal(1)); //通往地底的路
		return true;
}