/*
	名字:	隱藏地圖
	地圖:	突破甲板1
	描述:	925100200
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(925100300), pi.getMap(925100300).getPortal(0)); //突破甲板II
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The portal is not opened yet."));
		return false;
}