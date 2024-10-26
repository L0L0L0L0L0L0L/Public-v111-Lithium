/*
	名字:	堵塞的入口
	地圖:	最後城塔
	描述:	106021402
*/

var map = 106021600;
var num = 10;

function start() {
	cm.sendYesNo("You can enter the Wedding Hall using the Wedding Hall Key. Would you like to enter?");
}

function action(mode,type,selection) {
	if (mode > 0) {
		for (var i = 0; i < num; i++)
		if (cm.getMap(map + i).getCharacters().size() < 1) {
			cm.getMap(map + i).resetFully();
			cm.getPlayer().changeMap(cm.getMap(map + i), cm.getMap(map + i).getPortal(1));
			cm.getPlayer().startMapTimeLimitTask(1800, cm.getMap(106021402));
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
			}
			cm.dispose();
}