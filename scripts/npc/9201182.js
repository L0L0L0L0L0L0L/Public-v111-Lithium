/*
    Name:    Bo
    Map:     Victoria Harbor
    Description:    104000000
*/

var Text = [
	["Using the crazy alien power slot machine I’ve equipped, any item can have a slot installed! You can place special alien stones called “Nebulites” into the slot. Aliens use them to gain energy, and we can use these alien stones to provide special abilities to our equipment!"],
	["Nebulites are small stones that aliens brought with them when they invaded the Maple World. They are a source of energy. Around the area near New Leaf City, I have found some of the best Nebulites to date. Maybe you could go look for them there."],
	["Our ordinary equipment isn’t made to harness alien power, so I only know how to install a slot on one piece of equipment, but I am working hard to ensure the energy is perfectly converted as soon as possible."]
];

var status;
var select;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
		return;
	}

	switch (mode) {
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
			var chat = "Hi! I’m Bo, the world’s greatest alien technology expert, and also the world’s only alien technology expert! I tell you, I recently discovered something very interesting! I call it the alien Nebulite slot. #b";
			var options = ["What is a Nebulite slot?", "What exactly are Nebulites?", "What should I do?", "Buy #z2930000#"];
			for (var i = 0; i < options.length; i++) {
				chat += "\r\n#L" + i + "#" + options[i] + "#l";
			}
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection < 3) {
				cm.sendOk(Text[selection][status - 1]);
				cm.dispose();
			} else {
				cm.sendGetNumber("Would you like to buy my research product? It’s really great! \r\n(Unit price: 100,000 mesos)", 1, 1, 100);
			}
			break;
		case 2:
			cm.sendYesNo("You want to buy #b" + selection + "#k #z2930000#, for a total price of #b" + (100000 * selection) + "#k mesos. Are you sure you want to pay?");
			select = selection;
			break;
		case 3:
			if (cm.getPlayer().getMeso() < 100000 * select) {
				cm.sendOk("Are you short on mesos? You need at least #b" + (100000 * select) + "#k mesos.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
				cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough slots in the Use inventory."));
				cm.dispose();
				return;
			}
			cm.gainMeso(-100000 * select);
			cm.gainItem(2930000, select);
			cm.sendOk("Thank you! If you need anything else, please come back and see me.");
			cm.dispose();
	}
}
