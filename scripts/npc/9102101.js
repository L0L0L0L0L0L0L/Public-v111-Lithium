/*
	名字:	寵物訓練2
	地圖:	寵物公園
	描述:	100000202
*/

function start() {
	cm.sendYesNo("#b(I can see something covered in grass. Should l pull it out?)");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNext("#b(I didn't think much of it, so I didn't touch it.)");
		break;
	case 1:
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendNext("#b(It was nothing.)");
			cm.dispose();
			return;
			}
			cm.sendOk("#b(Yuck... it's pet poop!)");
			cm.gainItem(4031922, 1);
			}
			cm.dispose();
}