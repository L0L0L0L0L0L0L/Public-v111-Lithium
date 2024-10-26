/*
	名字:	瑞恩島
	地圖:	寒冷的森林４
	描述:	140090400
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21013)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(140090500), pi.getMap(140090500).getPortal(1)); //寒冷的森林５
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You must complete the quest before proceeding to the next map."));
		return false;
}