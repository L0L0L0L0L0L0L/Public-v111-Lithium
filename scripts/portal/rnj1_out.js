/*
	名字:	隱藏地圖
	地圖:	實驗室通道
	描述:	926100001
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(926100100), pi.getMap(926100100).getPortal(0)); //令人不適的實驗室
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The portal has not opened yet."));
		return false;
}