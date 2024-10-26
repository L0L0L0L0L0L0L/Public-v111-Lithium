/*
	名字:	外星基地
	地圖:	逃生路線
	描述:	610040600
*/

function start() {
	ms.getPlayer().startMapTimeLimitTask(600, ms.getMap(610040500));
	ms.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("Eliminate the aliens, get the key, and use the portal!"));
	ms.dispose();
}