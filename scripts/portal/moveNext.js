/*
	名字:	隱藏地圖
	地圖:	大將翁的鐵舖
	描述:	914021000
*/

var map = 914021010; //鐵舖外部
var num = 10;

function enter(pi) {
	for (var i = 0; i < num; i++)
	if (pi.getMap(map + i).getCharacters().size() < 1) {
		pi.getMap(map + i).resetFully();
		pi.getPlayer().changeMap(pi.getMap(map + i), pi.getMap(map + i).getPortal(1));
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(914021000));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
}