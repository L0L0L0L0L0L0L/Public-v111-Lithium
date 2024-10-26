/*
	名字:	新手教學
	地圖:	武陵道場修煉場
	描述:	925020010
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getMonsterById(9300216) != null) {
		pi.getPlayer().changeMap(pi.getMap(925020001), pi.getMap(925020001).getPortal(0)); //武陵道場入口
		pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(150100)).setCustomData(1);
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "So Gong: Haha! You're going to run away like a coward? I won't let you get away that easily!"));
		return false;
}