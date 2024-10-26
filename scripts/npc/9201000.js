/*
    Name: Muni
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
		case -1:
			cm.dispose();
			return;
		case 0:
			if (status < 3) {
				cm.dispose();
				return;
			}
			status--;
			break;
		case 1:
			status++;
			break;
	}

	switch (status) {
		case 0:
			var chat = "Hello, I am #p" + cm.getNpc() + "#, the ring craftsman. What do you need today?#b";
			var options = ["Craft an Engagement Ring", "Discard an Engagement Ring"];
			for (var i = 0; i < options.length; i++)
				chat += "\r\n#L" + i + "#" + options[i] + "#l";
			cm.sendSimple(chat);
			break;

		case 1:
			if (selection == 0) {
				// Check if player already has an engagement ring
				for (var i = 2240004; i < 2240014; i++) {
					if (cm.getPlayer().itemQuantity(i)) {
						cm.sendOk("Sorry, you already have an #bEngagement Ring#k, I cannot make another for you.");
						cm.dispose();
						return;
					}
				}

				// Check if the player is male
				if (cm.getPlayer().getGender() != 0) {
					cm.sendOk("Sorry, the engagement rings are only available for #bmen#k.");
					cm.dispose();
					return;
				}

				// Ring crafting options
				var chat = "Which type of engagement ring would you like me to craft for you?#b";
				var options = [2240004, 2240007, 2240010, 2240013];
				for (var i = 0; i < options.length; i++) {
					chat += "\r\n#L" + i + "##z" + options[i] + "##l";
				}
				cm.sendSimple(chat);
			} else if (selection == 1) {
				// Discard engagement ring
				for (var i = 2240004; i < 2240014; i++) {
					if (cm.getPlayer().itemQuantity(i)) {
						cm.removeAll(i);
						cm.sendOk("Your engagement ring has been #bdiscarded#k.");
						cm.dispose();
						return;
					}
				}
				cm.sendOk("You don't have any #bEngagement Rings#k to discard.");
				cm.dispose();
			}
			break;

		case 2:
			// Proceed to crafting selection
			selectItem = selection;
			var items = [2240004, 2240007, 2240010, 2240013];
			var matSet = [[4011004, 4021007], [4011006, 4021007], [4011007, 4021007], [4021009, 4021007]];
			var matSetQty = [[1, 1], [1, 1], [1, 1], [1, 1]];
			var costSet = [30000, 50000, 70000, 90000];

			item = items[selectItem];
			mat = matSet[selectItem];
			matQty = matSetQty[selectItem];
			cost = costSet[selectItem];

			var chat = "You want to craft #t" + item + "#?";
			chat += " I will need the following materials:#b";
			for (var i = 0; i < mat.length; i++) {
				chat += "\r\n#v" + mat[i] + "# " + matQty[i] + " #t" + mat[i] + "#";
			}
			chat += "\r\n#v4031138#" + cost + " mesos";
			cm.sendYesNo(chat);
			break;

		case 3:
			// Check if player has required materials and mesos
			for (var i = 0; i < mat.length; i++) {
				if (cm.getPlayer().itemQuantity(mat[i]) < matQty[i]) {
					cm.sendOk("Sorry, it seems you're missing some materials for the engagement ring. Please gather them first.");
					cm.dispose();
					return;
				}
			}

			if (cm.getPlayer().getMeso() < cost) {
				cm.sendOk("I'm afraid you'll need to pay a fee for my services. Please gather enough mesos before crafting.");
				cm.dispose();
				return;
			}

			if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
				cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough space in your inventory."));
				cm.dispose();
				return;
			}

			// Deduct materials, mesos, and grant the ring
			for (var i = 0; i < mat.length; i++) {
				cm.gainItem(mat[i], -matQty[i]);
			}
			cm.gainMeso(-cost);
			cm.gainItem(item, 1);
			cm.sendOk("Here is your #z" + item + "#. Congratulations on your engagement!");
			cm.dispose();
	}
}
