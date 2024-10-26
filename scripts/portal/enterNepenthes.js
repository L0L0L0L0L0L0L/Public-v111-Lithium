/*
	名字:	天空之城
	地圖:	散步路Ⅱ
	描述:	200060000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21739)).getStatus() != 1) {
		pi.getPlayer().changeMap(pi.getMap(200060001), pi.getMap(200060001).getPortal(2)); //人少的散步道
		return true;
		}
		var em = pi.getEventManager("SealStone");
		var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		em.startInstance(pi.getPlayer());
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
}