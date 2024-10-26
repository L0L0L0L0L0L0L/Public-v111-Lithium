/*
    Name: Yulita
    Map: Romeo and Juliet
    Description: 926110600
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
			status--;
			break;
		case 1:
			status++;
			break;
	}
	switch (status) {
		case 0:
			cm.sendNext("Looking back at everything I did, I was unable to set a proper example for the alchemy of Magatia and ended up being a negative example. Perhaps this is my contribution to alchemy!");
			break;
		case 1:
			cm.sendPrev("Now, seeing Romeo and Juliet happily together, I am very pleased.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v4001160# #t4001160# 1 \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 30,000 exp");
			break;
		case 2:
			if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
				cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough space in other item inventory."));
				cm.dispose();
				return;
			}
			cm.gainExp(30000);
			cm.gainItem(4001160, 1);
			cm.getPlayer().changeMap(cm.getMap(926110700), cm.getMap(926110700).getPortal(0));
			cm.dispose();
	}
}
