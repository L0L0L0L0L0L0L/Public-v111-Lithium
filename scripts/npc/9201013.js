/*
    Name: Sister Margaret
    Map: Wedding Town
    Description: 680000000
*/

var status = -1;

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

	if (status == 0) {
		cm.sendYesNo("Do you want to schedule a wedding?");
	} else if (status == 1) {
		// Check if the player is married
		if (cm.getPlayer().getMarriageId() <= 0) {
			cm.sendOk("Are you sure you want to do this?");
		}
		// Check if the player has enough inventory space
		else if (!cm.canHold(4150000, 60)) {
			cm.sendOk("Please clear some inventory space.");
		}
		// Check if the player has the wedding reservation ticket
		else if (!cm.getPlayer().itemQuantity(5251004) && !cm.getPlayer().itemQuantity(5251005) && !cm.getPlayer().itemQuantity(5251006)) {
			cm.sendOk("Please purchase a wedding reservation ticket from the Cash Shop.");
		}
		// If all conditions are met, proceed
		else {
			var chr = cm.getPlayer().getMap().getCharacterById(cm.getPlayer().getMarriageId());
			if (chr == null) {
				cm.sendOk("Make sure your partner is on the map.");
				cm.dispose();
				return;
			}
			var marr = cm.getQuestRecord(160001);
			var data = marr.getCustomData();
			if (data == null) {
				marr.setCustomData("0");
				data = "0";
			}
			if (data.equals("0")) {
				marr.setCustomData("1");
				cm.setQuestRecord(chr, 160001, "1");
				var num = 0;

				// Deduct the correct reservation ticket and set the wedding time
				if (cm.getPlayer().itemQuantity(5251006)) {
					cm.gainItem(5251006, -1);
					num = 60; // Premium Wedding
				} else if (cm.getPlayer().itemQuantity(5251005)) {
					cm.gainItem(5251005, -1);
					num = 30; // Deluxe Wedding
				} else if (cm.getPlayer().itemQuantity(5251004)) {
					cm.gainItem(5251004, -1);
					num = 10; // Basic Wedding
				}

				// Set the wedding time for both players
				cm.setQuestRecord(cm.getPlayer(), 160002, num + "");
				cm.setQuestRecord(chr, 160002, num + "");

				// Give the player wedding invitations
				cm.sendNext("You are now qualified for a wedding. Here are the wedding invitations. Invite your guests.");
				cm.gainItemPeriod(4150000, num, 1); // Wedding Invitation with a time period
			} else {
				cm.sendOk("It seems you are already married or have already scheduled a wedding.");
			}
		}
		cm.dispose();
	}
}
