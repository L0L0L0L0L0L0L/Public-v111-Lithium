/*
	名字:	隱藏地圖
	地圖:	隱藏之塔
	描述:	921160100
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getId() == 921160100 || pi.getPlayer().getMap().getId() == 921160500) {
		pi.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "One team member has entered the next area, leaving only " + (pi.getPlayer().getMap().getCharacters().size() - 1) + " Several team members are trapped in the tower prison."));
		}
	if ((pi.getPlayer().getMap().getId() == 921160200 || pi.getPlayer().getMap().getId() == 921160400) && pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's obstruction, the exit has been closed."));
		return false;
		}
	if (pi.getPlayer().getMap().getId() == 921160350) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "This channel has been compromised."));
		return false;
		}
	if (pi.getPlayer().getMap().getId() == 921160600 && pi.getPlayer().getEventInstance().getProperty("kentaSaving") != 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's raid, the channel has been blocked."));
		return false;
		}
		map = pi.getPlayer().getMap().getId() + 100;
		pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal("out00"));
		return false;
}