/*
	名字:	瑞恩島
	地圖:	寒冷的森林２
	描述:	140090200
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21011)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(140090300), pi.getMap(140090300).getPortal(1)); //寒冷的森林３
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You must complete the quest before proceeding to the next map."));
		return false;
}