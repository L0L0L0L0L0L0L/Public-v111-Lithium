/*
	Name: Flying Tiger Statue
	Map: Throne of the Evil Spirit 13
	Description: 990000900
*/

function start() {
	if (!cm.getPlayer().itemQuantity(4001024)) {
		cm.sendOk("This is your final challenge. Defeat the Lubian hiding within Rubin and return #v4001024# to me.");
		cm.dispose();
		return;
	}
	cm.removeAll(4001024);
	var eim = cm.getPlayer().getEventInstance();
	var prev = eim.setProperty("bossclear", "true", true);
	if (prev == null) {
		var start = parseInt(eim.getProperty("entryTimestamp"));
		var diff = Date.now() - start;

		var points = 1000 - Math.floor(diff / (100 * 60));

		cm.getGuild().gainGP(points < 1000 ? 1000 : points);
	}
	cm.warpParty(990001000, 0); // Warp all players in the map
	eim.startEventTimer(1 * 60000);
	cm.dispose();
}
