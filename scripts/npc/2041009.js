/*
    Name: Minnie
    Map: Toy City Hair Salon
    Description: 220000004
*/

var status;
var select; // This will hold the selection for hairstyle or color.

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
			if (status < 2) {
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
			var chat = "Welcome to Toy City Hair Salon! I'm Minnie. With a membership card, you can enjoy our professional services.#b";
			chat += "\r\n#L0##v5150052##t5150052#"; // Option for a random new hairstyle.
			chat += "\r\n#L1##v5151035##t5151035#"; // Option for a random new hair color.
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection < 1) { // Hairstyle change.
				if (cm.getPlayer().getGender() < 1) {
					hair = [30300, 30310, 30320, 30330, 30340, 30350, 30360, 30370]; // Male hairstyles.
				} else {
					hair = [31300, 31310, 31320, 31330, 31340, 31350, 31360]; // Female hairstyles.
				}

				// Adjusts the hair array to keep the player's current hair color.
				for (var i = 0; i < hair.length; i++) {
					hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10); // Retain current hair color.
				}
				cm.sendYesNo("Do you want to use #v5150052#? Your original appearance may change to a random new style.");
			} else { // Hair color change.
				var color = parseInt(cm.getPlayer().getHair() / 10) * 10; // Retain hairstyle, only change color.
				hair = [];

				for (var i = 0; i < 8; i++) {
					hair[i] = color + i; // Generate new hair color options.
				}
				cm.sendYesNo("Do you want to use #v5151035#? Your hair color may change to a random new color.");
			}
			select = selection;
			break;
		case 2:
			// Check if the player has the correct membership card for either hairstyle or color.
			if ((select < 1 && cm.getPlayer().itemQuantity(5150052) > 0) || (select > 0 && cm.getPlayer().itemQuantity(5151035) > 0)) {
				cm.gainItem(select < 1 ? 5150052 : 5151035, -1); // Deduct the card from the player's inventory.
				cm.setHair(hair[Math.floor(Math.random() * hair.length)]); // Set a random new hairstyle or hair color.
				cm.sendOk("Your new hairstyle is ready! Do you like it?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, without the required membership card, I cannot provide the service.");
			cm.dispose();
			break;
	}
}
