/*
	名字:	武陵道場
	地圖:	武陵道場1樓
	描述:	925020100
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getMonsterById(9300216) != null) {
		pi.dojoAgent_NextMap(true, false);
	if (isRestingSpot(pi.getPlayer().getMap().getId())) {
		pi.gainItem(4001620, 1);
		}
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's obstruction, the exit has been closed."));
		return false;
}

function isRestingSpot(id) {
	return (Math.floor(id / 100) % 100) % 6 == 0 && id != 925020001;
}