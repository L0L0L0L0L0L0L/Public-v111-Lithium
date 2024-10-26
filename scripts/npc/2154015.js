/*
	名字:	升降機操作台
	地圖:	機器人研究所3
	描述:	310060120
*/

function start() {
	cm.sendYesNo("Would you like to take the elevator that leads above ground? Press yes to take it.");
}

function action(mode, type, selection) {
	switch(mode) {
	case 0:
		cm.sendNext("Stops the elevator.");
		break;
	case 1:
		if (cm.getMap(310030211).getCharacters().size() < 1) {
			cm.getPlayer().changeMap(cm.getMap(310030211), cm.getMap(310030211).getPortal(0));
			cm.getPlayer().startMapTimeLimitTask(15, cm.getMap(310030200));
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "It's a strange-looking machine. Looks like it's on."));
			}
			cm.dispose();
}