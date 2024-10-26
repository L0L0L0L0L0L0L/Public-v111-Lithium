/*
	名字:	馬萊尼西亞島
	地圖:	叢林山谷
	描述:	600010300
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28749)).getStatus() > 1 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28753)).getStatus() != 2) {
		pi.openNpc(9201184);
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28752)).getStatus() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You cannot access this area."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(610040000), pi.getMap(610040000).getPortal(2)); //外星基地走廊 1
		return true;
}