/*
	名字:	隱藏地圖
	地圖:	其他次元的艾德斯塔公園
	描述:	931050120
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("Defeat Mastema's Phantom."));
	ms.dispose();
}