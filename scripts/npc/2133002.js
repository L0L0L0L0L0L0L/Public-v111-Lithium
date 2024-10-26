/*
    Name:    Eilin Forest Milestone
    Map:     Dense Fog Forest
    Description: 930000300
*/

function start() {
	cm.sendYesNo("Are you sure you want to leave #b#m" + cm.getPlayer().getMap().getId() + "##k?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.getPlayer().changeMap(cm.getMap(930000800), cm.getMap(930000800).getPortal(0));
	}
	cm.dispose();
}
