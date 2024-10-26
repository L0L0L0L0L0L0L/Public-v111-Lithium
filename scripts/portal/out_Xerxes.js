/*
	名字:	天上的克里塞
	地圖:	激戰薛西斯
	描述:	200101500
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's obstruction, the exit has been closed."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31013)).getStatus() == 1) {
		Packages.server.quest.MapleQuest.getInstance(31018).forceStart(pi.getPlayer(), 0, 1);
		}
		pi.getPlayer().changeMap(pi.getMap(200101400), pi.getMap(200101400).getPortal(1)); //進入競技場內部
		return true;
}