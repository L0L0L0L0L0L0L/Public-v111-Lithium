

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendOk("I'm sorry... is it too much to ask?");
		qm.dispose();
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
		qm.sendYesNo("Leon and I made this Flower Book long ago in our rose garden. Neither of us had any talent at that sort of thing, but it was a sign of our love. Perhaps it would stir feelings in him he thought forgotten.");
		break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.sendPrev("You have far too much in your Etc tab already. Please let me know when you have made some room.");
			qm.dispose();
			return;
			}
			qm.sendNext("If you were to take the Flower Book to Leon, maybe he would realize that I wait here for him. Please, I know it's unlikely, but you must try. Take the book to the #bAudience Room#k...");
			break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(3175).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.gainItem(4032837, qm.getPlayer().itemQuantity(4032837) ? 0 : 1);
		qm.dispose();
}
}