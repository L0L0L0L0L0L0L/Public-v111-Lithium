/*
	名字:	龍沉睡的島
	地圖:	被雪覆蓋的森林
	描述:	914100010
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22580)).getStatus() == 1) {
		pi.getPlayer().changeMap(pi.getMap(914100020), pi.getMap(914100020).getPortal(1)); //寂靜的洞穴
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22589)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(914100021), pi.getMap(914100021).getPortal(2)); //寂靜的洞穴
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22589)).getStatus() > 0) {
	if (pi.getMap(914100023).getCharacters().size() < 1) {
		pi.getMap(914100023).resetFully();
		pi.getPlayer().changeMap(pi.getMap(914100023), pi.getMap(914100023).getPortal(1)); //寂靜的洞穴
		pi.getPlayer().getMap().spawnNpc(1013204, new java.awt.Point(-300, -340));
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(914100010));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "A strange force is blocking you from entering."));
		return false;
}