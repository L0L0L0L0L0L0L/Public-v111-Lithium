/*
    Name: Big Head Ward
    Map: Archer Village Hair Salon
    Description: 100000104
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);  // Start the interaction with the player
}

function action(mode, type, selection) {
	switch (mode) {
		case -1:  // Exit conversation
			cm.dispose();
			return;
		case 0:  // If the player cancels or doesn't choose anything
			if (status < 2) {
				cm.dispose();
				return;
			}
			status--;
			break;
		case 1:  // Move forward in conversation
			status++;
			break;
	}

	switch (status) {
		case 0:  // Initial greeting
			var chat = "Welcome to Archer Village Hair Salon! I'm Big Head Ward. As long as you have our membership card, you can enjoy our professional services.#b";
			chat += "\r\n#L0##v5150053##t5150053# (Haircut)";  // Haircut membership card
			chat += "\r\n#L1##v5151036##t5151036# (Hair Dye)";  // Hair dye membership card
			cm.sendSimple(chat);  // Show options for haircut or hair dye
			break;
		case 1:
			if (selection == 0) {  // Player selects haircut
				if (cm.getPlayer().getGender() == 0) {  // Male hair options
					hair = [32150, 32160, 32310, 32320, 32330, 32340, 32350, 32360, 32370, 32380, 32390, 32400, 32410, 32420, 33000, 33030, 33040, 33050, 33060, 33070, 33080, 33090];
				} else {  // Female hair options (same as male in this case)
					hair = [32150, 32160, 32310, 32320, 32330, 32340, 32350, 32360, 32370, 32380, 32390, 32400, 32410, 32420, 33000, 33030, 33040, 33050, 33060, 33070, 33080, 33090];
				}

				for (var i = 0; i < hair.length; i++) {
					hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10);  // Keep current hair color
				}
				cm.sendStyle("Using our special machine, you can preview your new look. Choose a hairstyle you like.", hair);
			} else if (selection == 1) {  // Player selects hair dye
				var color = parseInt(cm.getPlayer().getHair() / 10) * 10;
				hair = [];

				for (var i = 0; i < 8; i++) {
					hair[i] = color + i;  // Generate 8 possible hair colors
				}
				cm.sendStyle("Using our special machine, you can preview your new look. Choose a hair color you like.", hair);
			}
			select = selection;  // Store the selection (haircut or hair dye)
			break;
		case 2:  // Confirm haircut or hair dye
			if ((select == 0 && cm.getPlayer().itemQuantity(5150053) > 0) || (select == 1 && cm.getPlayer().itemQuantity(5151036) > 0)) {
				cm.gainItem(select == 0 ? 5150053 : 5151036, -1);  // Deduct membership card based on service
				cm.setHair(hair[selection]);  // Set the player's hair style/color
				cm.sendOk("Your new hairstyle is done! Do you like it?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, without the specified membership card, I cannot provide the service.");
			cm.dispose();
			break;
	}
}
