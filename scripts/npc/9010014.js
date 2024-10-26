/*
	Name: Alami
	Map: Cupid Park
	Description: 100000200
*/

var status = -1;

function action(mode, type, selection) {
	switch (mode) {
		case 0:
			status--;
			break;
		case 1:
			status++;
			break;
	}
	if (cm.getClient().getChannel() == 2) {
		cm.sendNext("This event cannot be attempted in channel 2.");
		cm.dispose();
		return;
	}
	switch (status) {
		case 0:
			cm.sendNext("Hello~ I'm Alamiya. I know how to make fireworks! If you can gather #v4001128# for me, we can launch fireworks! Please bring me all the powder kegs you get from monsters.");
			break;
		case 1:
			cm.sendSimple("Every time users collect the required powder kegs, we can launch fireworks! \n\r #b#L0# I have brought the powder kegs.#l#k \n\r #b#L1# Please tell me the current status of powder keg collection.#l#k");
			break;
		case 2:
			if (selection == 1) {
				cm.sendNext("Powder keg collection status \n\r #B" + cm.getKegs() + "# \n\r If we collect them all, we can start the fireworks...");
				cm.safeDispose();
			} else if (selection == 0) {
				cm.sendGetNumber("Did you bring the powder kegs? Then please give me your #火药桶#k. I want to make a beautiful firework. How many would you like to give me? \n\r #b< Number of Powder Kegs in inventory : 0 >#k", 0, 0, 10000);
			}
			break;
		case 3:
			var num = selection;
			if (num == 0) {
				cm.sendOk("T.T I need powder kegs to launch the fireworks....\r\n Please think again and talk to me.");
			} else if (cm.itemQuantity(4001128) > num) {
				cm.gainItem(4001128, -num);
				cm.giveKegs(num);
				cm.sendOk("Don't forget to give me the powder kegs when you get them.");
			}
			cm.safeDispose();
	}
}
