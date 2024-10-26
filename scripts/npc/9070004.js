/*
	Name:	Maximus
	Map:	Archer Village
	Description:	100000000
*/


function start() {
	cm.sendYesNo("The battle square welcomes heroes and I look forward to your arrival!");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendOk("What a shame, I thought you were full of talent.");
		break;
	case 1:
		cm.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("BATTLESQUARE"));
		cm.getPlayer().changeMap(cm.getMap(960000000), cm.getMap(960000000).getPortal(0));
		}
		cm.dispose();
}