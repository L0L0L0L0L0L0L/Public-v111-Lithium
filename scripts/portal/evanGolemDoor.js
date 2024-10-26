/*
	名字:	菇菇歌唱森林
	地圖:	銀蓮花叢林
	描述:	100020200
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22557)).getStatus() != 1) {
		pi.getPlayer().changeMap(pi.getMap(100040000), pi.getMap(100040000).getPortal(3)); //石巨人寺院入口
		return true;
		}
	if (pi.getMap(910600000).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.getMap(910600000).resetFully();
		pi.getPlayer().changeMap(pi.getMap(910600000), pi.getMap(910600000).getPortal(1)); //石人寺院的入口
		pi.getPlayer().getMap().spawnNpc(1013201, new java.awt.Point(258, 280)); //卡蜜拉
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(100020200));
		return true;
}