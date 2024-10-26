/*
	名字:	隱藏地圖
	地圖:	艾德斯塔公園噴水台附近3
	描述:	931050210
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("The rumored monster has appeared, eliminate it."));
	ms.dispose();
}