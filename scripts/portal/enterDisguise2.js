/*
	名字:	皇后之路
	地圖:	修煉森林1
	描述:	130010000
*/

var quest = [20301, 20302, 20303, 20304, 20305];

function enter(pi) {
	for (var i = 0; i < quest.length; i ++)
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[i])).getStatus() == 1) {
	if (pi.getMap(913002100).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.getMap(913002100).resetFully();
		pi.getPlayer().changeMap(pi.getMap(913002100), pi.getMap(913002100).getPortal(1)); //提弗森林
		pi.getPlayer().getMap().spawnNpc(1104104, new java.awt.Point(3620, 88));
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(130010020), pi.getMap(130010020).getPortal(2)); //提弗森林
		return true;
}