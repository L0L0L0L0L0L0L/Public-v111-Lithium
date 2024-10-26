/*
	Name: Gatekeeper
	Map: William's Castle Gate
	Description: 990000300
*/

function start() {
	if (cm.getPlayer().getMap().getReactorByName("statuegate").getState() > 0) {
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
	switch (eim.getProperty("stage1")) {
		case null:
		case "waiting":
			if (eim.getProperty("stage1phase") == null) eim.setProperty("stage1phase", 1);
			stage = parseInt(eim.getProperty("stage1phase"));
			cm.sendNext(stage == 1 ? "Welcome to William's Castle Gate. To enter the castle, you must pass my test. I will display a pattern on the statues around me. You just need to remember the #border of the statues#k where the pattern appears and repeat it once." : "I am now going to present a more difficult pattern. Good luck.");
			break;
		case "active":
			stage = parseInt(eim.getProperty("stage1phase"));

			if (eim.getProperty("stage1combo").equals(eim.getProperty("stage1guess"))) {

				if (stage == 3) {
					cm.sendOk("Test passed! The entrance to the next area has been opened.");
					cm.getPlayer().getMap().getReactorByName("statuegate").forceHitReactor(1);
					cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
					cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
					cm.getGuild().gainGP(500);
					cm.dispose();
					return;
				}
				cm.sendNext("Your answer is satisfactory. There are more tests to complete. Talk to me again when you are ready.");
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Completed Stage " + stage + " of the Gatekeeper's test"));
				eim.setProperty("stage1phase", stage + 1);
				eim.setProperty("stage1", "waiting");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, your answer is unsatisfactory. Please stay calm and try again later.");
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Test failed, did not pass the Gatekeeper's test"));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/wrong_kor", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Failed", 4));
			eim.setProperty("stage1phase", 1);
			eim.setProperty("stage1", "waiting");
			cm.dispose();
			break;
		default:
			cm.sendOk("The statues are preparing the pattern. Please wait.");
			cm.dispose();
	}
}

function action(mode, type, selection) {
	if (mode > 0) {
		var eim = cm.getPlayer().getEventInstance();
		var reactors = getReactors();
		var combo = makeCombo(reactors);
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Displaying the combination, please wait"));
		var delay = 5000;
		for (var i = 0; i < combo.length; i++) {
			cm.getPlayer().getMap().getReactorByOid(combo[i]).delayedHitReactor(cm.getClient(), delay + 3500 * i);
		}
		eim.setProperty("stage1", "display");
		eim.setProperty("stage1combo", "");
	}
	cm.dispose();
}

function getReactors() {
	var reactors = new Array();

	var iter = cm.getPlayer().getMap().getAllReactorsThreadsafe().iterator();
	while (iter.hasNext()) {
		var mo = iter.next();
		if (!mo.getName().equals("statuegate")) {
			reactors.push(mo.getObjectId());
		}
	}
	return reactors;
}

function makeCombo(reactors) {
	var combo = new Array();
	while (combo.length < (stage + 3)) {
		var chosenReactor = reactors[Math.floor(Math.random() * reactors.length)];
		var repeat = false;
		if (combo.length > 0) {
			for (var i = 0; i < combo.length; i++) {
				if (combo[i] == chosenReactor) {
					repeat = true;
					break;
				}
			}
		}
		if (!repeat) {
			combo.push(chosenReactor);
		}
	}
	return combo;
}
