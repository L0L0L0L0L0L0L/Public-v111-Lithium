/*
	名字:	次元的縫隙
	地圖:	黑暗的祭壇 入口
	描述:	272030300
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20757)).getStatus() == 1 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20757)).getMobKills(9300304) < 1) {
		pi.openNpc(1104209);
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You cannot access this area."));
		return false;
}