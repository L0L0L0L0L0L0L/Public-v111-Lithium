/*
	名字:	瑞恩島
	地圖:	寒冷的森林３
	描述:	140090300
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21012)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(140090400), pi.getMap(140090400).getPortal(1)); //寒冷的森林４
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You must complete the quest before proceeding to the next map."));
		return false;
}