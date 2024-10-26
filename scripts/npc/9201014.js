/*
    Name:    Fira
    Map:     Wedding Town
    Description:    680000000
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
	if (status == 0) {
		if (cm.getPlayer().getMarriageId() > 0) {
			cm.sendSimple("What's wrong? You look sad...\r\n#b#L0#I want a divorce.#l\r\n#L1#I want to remove a ring from my inventory.#l#k");
		} else {
			cm.sendSimple("Hi, what can I do for you?\r\n#L1#I want to remove a ring from my inventory.#l#k");
		}
	}
	if (status == 1) {
		if (selection == 0) {
			cm.sendYesNo("Divorce? Are you sure? You really want to get divorced? This is not a joke, right?");
		} else {
			var selStr = "Which ring do you want to remove? Let me see.";
			var found = false;
			for (var i = 1112300; i < 1112312; i++) {
				if (cm.getPlayer().itemQuantity(i)) {
					found = true;
					selStr += "\r\n#L" + i + "##v" + i + "##t" + i + "##l";
				}
			}
			for (var i = 2240004; i < 2240016; i++) {
				if (cm.getPlayer().itemQuantity(i)) {
					found = true;
					selStr += "\r\n#L" + i + "##v" + i + "##t" + i + "##l";
				}
			}
			if (!found) {
				cm.sendOk("You have no rings.");
				cm.dispose();
			} else {
				cm.sendSimple(selStr);
			}
		}
	}
	if (status == 2) {
		if (selection == -1) {
			var cPlayer = cm.getClient().getChannelServer().getPlayerStorage().getCharacterById(cm.getPlayer().getMarriageId());
			if (cPlayer == null) {
				cm.sendNext("Please make sure your partner is online.");
			} else {
				cPlayer.dropMessage(1, "Your partner wants to divorce you.");
				cPlayer.setMarriageId(0);
				cm.setQuestRecord(cPlayer, 160001, "0");
				cm.setQuestRecord(cm.getPlayer(), 160001, "0");
				cm.setQuestRecord(cPlayer, 160002, "0");
				cm.setQuestRecord(cm.getPlayer(), 160002, "0");
				cm.getPlayer().setMarriageId(0);
				for (var i = 1112300; i < 1112312; i++) {
					cm.gainItem(i, -1);
				}
				cm.sendNext("Divorce successful.");
			}
		} else {
			if (selection >= 1112300 && selection < 1112312) {
				cm.gainItem(selection, -1);
				cm.sendOk("You have successfully removed the ring.");
			} else if (selection >= 2240004 && selection < 2240016) {
				cm.gainItem(selection, -1);
				cm.sendOk("Your engagement ring has been removed.");
			}
		}
		cm.dispose();
	}
}
