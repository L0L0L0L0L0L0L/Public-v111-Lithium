/*
	名字:	毒霧森林
	地圖:	毒霧森林
	描述:	930000000
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getId() == 930000000) {
		pi.getPlayer().changeMap(pi.getMap(930000100), pi.getMap(930000100).getPortal(0)); //初入森林
		return true;
		}
	if (pi.getPlayer().getMap().getId() == 930000100) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(930000200), pi.getMap(930000200).getPortal(0)); //變質的森林
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Eliminate all the monsters."));
		return false;
		}
	if (pi.getPlayer().getMap().getId() == 930000200) {
	if (pi.getPlayer().getMap().getReactorByName("spine").getState() < 4) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The spine blocks the way."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(930000300), pi.getMap(930000300).getPortal(1)); //濃霧森林
		}
		return true;
}