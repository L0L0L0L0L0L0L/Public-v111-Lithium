/*
	名字:	埃德爾斯坦
	地圖:	戒備深嚴的住宅
	描述:	931010010
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "If you don't defeat the robots, they'll know you're an infiltrator. Defeat all the robots!"));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(310000000), pi.getMap(310000000).getPortal(15)); //埃德爾斯坦
		return true;
}