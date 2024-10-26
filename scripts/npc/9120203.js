/*
    Name: Suzuki
    Map: Base Interior (Final Destination)
    Description: 801040101
*/

function start() {
	// Initial dialogue when interacting with Suzuki
	cm.sendNext("The Black Road Elder has been defeated, what a joyful day it is! You can head back to town along this path. Good luck!");
}

function action(mode, type, selection) {
	if (mode > 0) {
		// If the player accepts or continues, they are sent to the town map (ID: 801000000)
		cm.getPlayer().changeMap(cm.getMap(801000000), cm.getMap(801000000).getPortal(0));
	}
	// Dispose the NPC interaction
	cm.dispose();
}
