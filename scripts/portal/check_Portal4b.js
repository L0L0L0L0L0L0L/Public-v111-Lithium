/*
	名字:	過去的神木村
	地圖:	燃燒的神木村4
	描述:	272000410
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's obstruction, the exit has been closed."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31176)).getStatus() < 2) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Bastille appears here, is something happening."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(272000500), pi.getMap(272000500).getPortal(1)); //燃燒的神木村5
		return true;
}