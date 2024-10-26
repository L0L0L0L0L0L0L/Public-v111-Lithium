/*
	名字:	生命之穴
	地圖:	抉擇洞穴
	描述:	240050200
*/

function enter(pi) {
	if (pi.getPlayer().getParty().getLeader().getId() != pi.getPlayer().getId()) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You are not the party leader. Only the party leader may proceed through this portal."));
		return false;
		}
	if (pi.getPlayer().getMap().getReactorByName("light").getState() == 1) {
		pi.warpParty(240050300); //光明洞穴
		return true;
		}
	if (pi.getPlayer().getMap().getReactorByName("light").getState() == 3) {
		pi.warpParty(240050310); //暗黑洞穴
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Hit the Lightbulb to determine your fate!"));
		return false;
}