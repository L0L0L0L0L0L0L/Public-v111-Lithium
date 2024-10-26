/*
	名字:	倒下的騎士
	地圖:	黑暗魔女的洞穴
	描述:	924010100
*/

function start() {
	if (cm.getMap(913030000).getCharacters().size() < 1) {
		cm.getMap(913030000).resetFully();
		cm.getPlayer().changeMap(cm.getMap(913030000), cm.getMap(913030000).getPortal(0));
		cm.getPlayer().getMap().spawnNpc(1104002, new java.awt.Point(-430, 88));
		cm.getPlayer().startMapTimeLimitTask(1800, cm.getMap(924010100));
		cm.dispose();
		return;
		}
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Someone is already in this map, Better come back later."));
		cm.dispose();
}