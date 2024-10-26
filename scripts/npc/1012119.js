/*
    Name: Wang Nianhai
    Map: Germ Hill
    Description: 100020000
*/

var map = 910060000;  // Base map ID for the training centers

function start() {
	if (cm.getPlayer().getLevel() > 30) {  // Check if player level is above 30
		cm.sendOk("You cannot use this service after level 30.");
		cm.dispose();
		return;
	}

	var chat = "Choose a training center you want to go to. You cannot use this after level 30!#b";
	for (var i = 0; i < 5; i++) {
		chat += "\r\n#L" + i + "#Training Center " + i + " (" + cm.getMap(map + i).getCharacters().size() + "/3)#l";
	}
	cm.sendSimple(chat);  // Display the list of training centers with their current occupancy
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getMap(map + selection).getCharacters().size() < 4) {  // Check if the selected training center has less than 4 players
			cm.getPlayer().changeMap(cm.getMap(map + selection), cm.getMap(map + selection).getPortal(1));
			cm.dispose();
			return;
		}
		cm.sendOk("This training center is full. Please try again later!");
	}
	cm.dispose();
}
