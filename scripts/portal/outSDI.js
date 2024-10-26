/*
	名字:	龍沉睡的島
	地圖:	寂靜的洞穴
	描述:	914100022
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22588)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(914100010), pi.getMap(914100010).getPortal(2)); //被雪覆蓋的森林
		Packages.server.quest.MapleQuest.getInstance(22600).forceStart(pi.getPlayer(), 0, 1);
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You can't leave like this. The task entrusted by Hiver has not been completed yet."));
		return false;
}