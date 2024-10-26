/*
	名字:	艾納斯島
	地圖:	寒冰平原
	描述:	211050000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21610)).getStatus() != 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Rider's Field. You cannot enter without a reason."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(921110000), pi.getMap(921110000).getPortal(2)); //騎士的平原
		pi.getPlayer().startMapTimeLimitTask(300, pi.getMap(211050000));
		return true;
}