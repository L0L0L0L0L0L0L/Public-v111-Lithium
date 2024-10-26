/*
    Name:    Aldpl
    Map:     Dream Theme Park
    Description:    551030200
*/

function start() {
	cm.sendYesNo("Are you sure you want to leave #b#m" + cm.getPlayer().getMap().getId() + "##k?");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(551030100), cm.getMap(551030100).getPortal(0));
	cm.dispose();
}
