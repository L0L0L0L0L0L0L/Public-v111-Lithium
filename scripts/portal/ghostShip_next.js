/*
	名字:	霧之海
	地圖:	第1 作戰室
	描述:	923020110
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() != 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Please, clear all of the monsters!"));
		return false;
		}
	if (pi.getPlayer().getParty().getLeader().getId() != pi.getPlayer().getId()) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The leader must be here."));
		return false;
		}
	if (((pi.getPlayer().getMap().getId() % 10) | 0) == 4) {
		if (pi.getPlayer().getMap().getReactorByName("switch0").getState() < 1 || pi.getPlayer().getMap().getReactorByName("switch1").getState() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Both switches must be turned on."));
		return false;
		}
		var bossroom = pi.getPlayer().getMap().getId() + 66; //90-14 = 76, 90-24=66
	if (((bossroom % 100) | 0) != 90) {
		bossroom += 10;
		}
		pi.warpParty(bossroom, 0);
		return true;
		}
		pi.warpParty(pi.getPlayer().getMap().getId() + 1, ((pi.getPlayer().getMap().getId() % 10) | 0) == 3 ? 1 : 2);
		return true;
}