/*
	名字:	奈歐市&amp;lt;2099年&gt;
	地圖:	夜晚的港灣倉庫
	描述:	240070202
*/

var map =[240070202, 240070302, 240070402, 240070502, 240070602];

function enter(pi) {
	for (var i = 0; i < map.length; i++)
	if (pi.getPlayer().getMap().getId() == map[i] && pi.getMap(map[i] + 1).getCharacters().size() < 1) {

		pi.getPlayer().changeMap(pi.getMap(map[i] +1), pi.getMap(map[i] +1).getPortal(1));
		pi.getPlayer().startMapTimeLimitTask(1200, pi.getMap(map[i]));
		if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3725)).getStatus() == 1) {
			pi.getPlayer().getMap().killMonster(7220003);
			pi.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(7220005), new java.awt.Point(570, 392));
			}
			}
			pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
			return false;
}