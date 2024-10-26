/*
	名字:	石巨人寺院
	地圖:	第1階段 : 石巨人寺院1
	描述:	952000000
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Please kill all monsters first."));
		return false;
		}
		map = pi.getPlayer().getMap().getId() + 100;
		pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(0));
		return true;
}