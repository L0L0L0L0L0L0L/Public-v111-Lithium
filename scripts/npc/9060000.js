/*
	Name: Kant
	Map: Wild Boar Breeding Room
	Description: 923010000
*/

function start() {
	if (cm.getPlayer().itemQuantity(4031508) < 5 || cm.getPlayer().itemQuantity(4031507) < 5) {
		cm.sendYesNo("Do you want to give up the quest and leave #b#m" + cm.getPlayer().getMap().getId() + "##k?");
	} else {
		cm.sendYesNo("You have successfully collected 5 research reports and pheromones. Now, I will send you back to the park. Find me there.");
	}
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.getPlayer().changeMap(cm.getMap(923010100), cm.getMap(923010100).getPortal(0));
	}
	cm.dispose();
}
