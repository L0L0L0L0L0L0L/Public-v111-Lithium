/*
	名字:	日落之路
	地圖:	瑪迦提亞城
	描述:	261000000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23270)).getStatus() == 1) {
		var em = pi.getEventManager("q23270");
		var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		em.startInstance(pi.getPlayer());
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23270)).getStatus() > 1 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23271)).getStatus() < 2) {
		pi.getPlayer().changeMap(pi.getMap(926150020), pi.getMap(926150020).getPortal(1)); //卡帕萊特協會3
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(261000020), pi.getMap(261000020).getPortal(3)); //卡帕萊特協會3
		return true;
}