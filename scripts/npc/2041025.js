/*
    Name: Mechanical Device
    Map: Power Room
    Description: 220080001
*/

function start() {
	cm.sendYesNo("Beep beep... beep beep... I can help you escape to a safer place... beep beep... Do you want to leave #m" + cm.getPlayer().getMap().getId() + "#?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.getPlayer().changeMap(cm.getMap(220080000), cm.getMap(220080000).getPortal(5));
	}
	cm.dispose();
}
