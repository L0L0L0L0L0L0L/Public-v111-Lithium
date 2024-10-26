/*
    Name: Elle
    Map: Toy City Plastic Surgery
    Description: 220000003
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
			var chat = "Welcome to Toy City Plastic Surgery. I'm Elle. If you have a membership card, you can enjoy our professional services.#b";
			chat += "\r\n#L1##v5152057##t5152057#"; // Displays the option for the specific membership card.
			cm.sendSimple(chat);
			break;
		case 1:
			if (cm.getPlayer().getGender() < 1) {
				face = [20020, 20021, 20022, 20023, 20024, 20025, 20026, 20027, 20028, 20029]; // Male faces.
			} else {
				face = [21020, 21021, 21022, 21023, 21024, 21025, 21026, 21027, 21028, 21029]; // Female faces.
			}

			cm.sendStyle("Using our specialized machine, you can preview how you will look after surgery. Please choose a look you like.", face);
			break;
		case 2:
			if (cm.getPlayer().itemQuantity(5152057) > 0) { // Check if the player has the required membership card.
				cm.gainItem(5152057, -1); // Deducts the card from inventory.
				cm.setFace(face[selection]); // Applies the selected face.
				cm.sendOk("Your new look has been successfully applied. Do you like it?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, without the specified membership card, I can't perform the surgery.");
			cm.dispose();
			break;
	}
}
