/*
	Name: Stone of the Guardian
	Map: Sage's Fountain
	Description: 990000500
*/

function start() {
	if (cm.getPlayer().getMap().getReactorByName("watergate").getState() > 0) {
		cm.sendOk("The entrance to the next area has been opened.");
		cm.dispose();
		return;
	}
	if (cm.getPlayerStat("GRANK") > 2) {
		cm.sendOk("Sorry, I will only speak with the person in charge of this guild mission.");
		cm.dispose();
		return;
	}
	var eim = cm.getPlayer().getEventInstance();
	var currentCombo = eim.getProperty("stage3combo");
	if (currentCombo == null || currentCombo.equals("reset")) {
		var newCombo = makeCombo();
		eim.setProperty("stage3combo", newCombo);
		eim.setProperty("stage3attempt", 1);
		cm.sendOk("Welcome to the Sage's Fountain. This place protects the secret passage to the throne. Please provide the items needed by the attendants. They will tell you if the items are correct. If you provide incorrect items, they will be displeased. You have #bseven attempts#k. Good luck. When you are ready, please talk to me again.");
		cm.dispose();
		return;
	}
	var attempt = parseInt(eim.getProperty("stage3attempt"));
	var combo = parseInt(currentCombo);
	var guess = getGroundItems();
	if (guess == null) {
		cm.sendOk("Please make sure the items you have offered are correctly placed in front of the attendants, then talk to me again.");
		cm.dispose();
		return;
	}
	if (combo == guess) {
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		cm.getGuild().gainGP(500);
		cm.getPlayer().getMap().getReactorByName("watergate").forceHitReactor(1); // Open the specified reactor
		cm.sendOk("The entrance to the next area has been opened.");
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The entrance to the next area has been opened"));
		cm.dispose();
		return;
	}
	if (attempt < 7) {
		var comboItems = [0, 0, 0, 0];
		var guessItems = [0, 0, 0, 0];

		var correct = 0, incorrect, unknown = 0;
		for (var i = 0; i < 4; i++) {
			var guessIdx = Math.floor(guess / Math.pow(10, i)) % 10;
			var comboIdx = Math.floor(combo / Math.pow(10, i)) % 10;

			if (guessIdx != comboIdx) {
				guessItems[guessIdx]++;
				comboItems[comboIdx]++;
			} else {
				correct++;
			}
		}

		for (var i = 0; i < 4; i++) {
			var diff = guessItems[i] - comboItems[i];
			if (diff > 0) unknown += diff;
		}
		incorrect = 4 - correct - unknown;

		var string = "";

		if (correct != 0) {
			string += (correct == 1 ? "One attendant is pleased with the offering.\r\n" : correct + " attendants are pleased with the offerings.\r\n");
		}
		if (incorrect != 0) {
			string += (incorrect == 1 ? "One attendant is displeased with the offering.\r\n" : incorrect + " attendants are displeased with the offerings.\r\n");
		}
		if (unknown != 0) {
			string += (unknown == 1 ? "One attendant received an unknown item.\r\n" : unknown + " attendants received unknown items.\r\n");
		}
		string += "This is your ";
		switch (attempt) {
			case 1:
				string += "first stage";
				break;
			case 2:
				string += "second stage";
				break;
			case 3:
				string += "third stage";
				break;
			default:
				string += attempt + "th";
				break;
		}
		string += " attempt.";

		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300036), new java.awt.Point(-350 + (Math.random() * 500), 150));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300037), new java.awt.Point(400 + (Math.random() * 500), 150));
		cm.sendOk(string);
		eim.setProperty("stage3attempt", attempt + 1);
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/wrong_kor", 3));
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Failed", 4));
		cm.dispose();
		return;
	}
	eim.setProperty("stage3combo", "reset");
	cm.sendOk("Sorry, your answer is unsatisfactory. Please stay calm and try again later.");

	for (var i = 0; i < 6; i++) {
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300036), new java.awt.Point(-350 + (Math.random() * 500), 150));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300037), new java.awt.Point(-350 + (Math.random() * 500), 150));
	}
	cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/wrong_kor", 3));
	cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Failed", 4));
	cm.dispose();
}

function makeCombo() {
	var combo = 0;

	for (var i = 0; i < 4; i++) {
		combo += (Math.floor(Math.random() * 4) * Math.pow(10, i));
	}
	return combo;
}

function getRawItems() {
	var mapItems = cm.getPlayer().getMap().getItemsInRange(cm.getPlayer().getPosition(), java.lang.Double.POSITIVE_INFINITY);
	var rawItems = new Array();

	var iter = mapItems.iterator();
	while (iter.hasNext()) {
		var item = iter.next();
		var id = item.getItem().getItemId();
		if (id < 4001027 || id > 4001030) {
			continue;
		} else {
			rawItems.push(item);
		}
	}
	return rawItems;
}

// Check the items on the ground and convert them into an applicable string; null if items aren't proper
function getGroundItems() {
	var itemInArea = new Array(-1, -1, -1, -1);

	var rawItems = getRawItems();
	if (rawItems.length != 4) return null;
	for (var j = 0; j < rawItems.length; j++) {
		var item = rawItems[j];
		var id = item.getItem().getItemId();

		// Check item location
		for (var i = 0; i < 4; i++) {
			if (cm.getPlayer().getMap().getArea(i).contains(item.getPosition())) {
				itemInArea[i] = id - 4001027;
				break;
			}
		}
	}

	// Guaranteed four items that are part of the stage 3 item set by this point, check to see if each area has an item
	if (itemInArea[0] == -1 || itemInArea[1] == -1 || itemInArea[2] == -1 || itemInArea[3] == -1)
		return null;

	return ((itemInArea[0] * 1000) + (itemInArea[1] * 100) + (itemInArea[2] * 10) + itemInArea[3]);
}
