/*
	名字:	騎士團要塞
	地圖:	騎士團第4區域
	描述:	271030400
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31146)).getStatus() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You cannot access this area."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(271030410), pi.getMap(271030410).getPortal(1)); //秘密庭院
		return true;
}