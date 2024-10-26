/*
    Name:    Little Fairy
    Map:     Forest Clearing
    Description: 930000500
*/

function start() {
	if (!cm.getPlayer().itemQuantity(4001163)) {
		cm.sendOk("I heard from Eilin that you are the heroes who came to help the forest. The forest's water source has been cursed by monsters. We need to find and eliminate the monster. Please search the nearby area for #b#v4001163##t4001163##k, which is a gem that can lure the monster out.");
		cm.dispose();
		return;
	}
	cm.sendYesNo("Oh, you have found the Purple Magic Stone. We finally have a way to deal with the monster. Shall we head to #b#m930000600##k now?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.warpParty(930000600, 0);
	}
	cm.dispose();
}
