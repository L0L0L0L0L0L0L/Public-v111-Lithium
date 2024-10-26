/*
    Name: Robert IV
    Map: Wedding Town
    Description: 680000000
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
		case 0:
			if (status == 0) {
				cm.dispose();
				return;
			}
			status--;
			break;
		case 1:
			status++;
			break;
	}

	// Check if the player is on the right map for the wedding ceremony
	if (cm.getPlayer().getMap().getId() != 680000210) {
		cm.sendOk("If you want to have a wedding, please speak with my assistant.");
		cm.dispose();
		return;
	}

	// Prompt the player for confirmation to begin the wedding
	if (status == 0) {
		cm.sendYesNo("Are you ready to proceed with your wedding?");
	} else if (status == 1) {
		// Retrieve the marriage quest data
		var marr = cm.getQuestRecord(160001);
		var data = marr.getCustomData();
		if (data == null) {
			marr.setCustomData("0");
			data = "0";
		}

		// Check if the player is eligible to proceed with the wedding
		if (data.equals("1")) {
			// Check if the player is engaged
			if (cm.getPlayer().getMarriageId() <= 0) {
				cm.sendOk("An error has occurred: you are not engaged to anyone.");
				cm.dispose();
				return;
			}

			// Check if the player's partner is on the same map
			var chr = cm.getPlayer().getMap().getCharacterById(cm.getPlayer().getMarriageId());
			if (chr == null) {
				cm.sendOk("Please make sure your partner is on the map.");
				cm.dispose();
				return;
			}

			// Proceed with the wedding ceremony
			marr.setCustomData("2_");
			cm.setQuestRecord(chr, 160001, "2_");
			cm.doWeddingEffect(chr);

		} else if (data.equals("2_") || data.equals("2")) {
			// Check if the player is engaged
			if (cm.getPlayer().getMarriageId() <= 0) {
				cm.sendOk("An error has occurred: you are not engaged to anyone.");
				cm.dispose();
				return;
			}

			// Check if the player's partner is on the same map
			var chr = cm.getPlayer().getMap().getCharacterById(cm.getPlayer().getMarriageId());
			if (chr == null) {
				cm.sendOk("Please make sure your partner is on the map.");
				cm.dispose();
				return;
			}

			// Update the quest records to indicate the wedding is complete
			cm.setQuestRecord(cm.getPlayer(), 160001, "3");
			cm.setQuestRecord(chr, 160001, "3");

			// Check the type of wedding (simple or luxurious) and warp to the corresponding map
			var dat = parseInt(cm.getQuestRecord(160002).getCustomData());
			if (dat > 10) {
				cm.warpMap(680000300, 0); // Warp to the luxurious wedding map
			} else {
				cm.setQuestRecord(chr, 160002, "0");
				cm.setQuestRecord(cm.getPlayer(), 160002, "0");
				cm.warpMap(680000300, 0); // Warp to the simple wedding map
			}

		} else {
			// If the player is not ready for a wedding
			cm.sendOk("Look at this lovely couple, may they be blessed.");
		}

		cm.dispose();
	}
}
