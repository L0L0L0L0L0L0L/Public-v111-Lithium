/*
	名字:	隱藏地圖
	地圖:	武陵道場特別樓
	描述:	925040001
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Mu Gong: You sick man, I'm going to beat you down until you're down."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(925040000), pi.getMap(925040000).getPortal(1)); //武陵道場後路
		return true;
}