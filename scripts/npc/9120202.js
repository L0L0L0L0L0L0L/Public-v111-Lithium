/*
    Name: Suzuki
    Map: Base Interior
    Description: 801040100
*/

function start() {
	var eim = cm.getPlayer().getEventInstance();
	if (eim.getProperty("shouwaBoss") == null) {
		// If the "shouwaBoss" property is not set, it means the boss hasn't been defeated yet
		cm.sendOk("Are you planning to escape without considering my safety? We are in the same boat now, and no one can leave until the Black Road Elder is defeated!");
		cm.dispose();
		return;
	}
	// If the boss is defeated, inform the player and mention a suspicious machine
	cm.sendNext("The Black Road Elder has been defeated, well done! I found a suspicious machine inside, and we need to move it out.");
}

function action(mode, type, selection) {
	if (mode > 0) {
		// If the player accepts or continues, they are transported to another map (ID: 801040101)
		cm.getPlayer().changeMap(cm.getMap(801040101), cm.getMap(801040101).getPortal(0));
	}
	// Dispose the NPC interaction
	cm.dispose();
}
