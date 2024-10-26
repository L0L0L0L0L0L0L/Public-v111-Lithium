/*
	名字:	寵物訓練師巴特斯
	地圖:	寵物公園
	描述:	100000202
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
		if (status < 1) {
		cm.dispose();
		return;
		}
		if (status < 2) {
		cm.sendNext("Hmmm ... too busy to do it right now? If you feel like doing it, though, come back and find me.");
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
		cm.sendSimple("Do you have any business with me? \r\n#L0##bPlease tell me about this place.#l");
		break;
	case 1:
		if (cm.getPlayer().itemQuantity(4031035)) {
			cm.sendNext("Get that letter, jump over obstacles with your pet, and take that letter to my brother #p1012007#. Get him the letter and something good is going to happen to your pet.");
			cm.dispose();
			return;
			}
			cm.sendYesNo("This is the road where you can go take a walk with your pet. You can just walk around with it, or you can train your pet to go through the obstacles here. If you aren't too close with your pet yet, that may present a problem and he will not follow your command as much ... so, what do you think? Wanna train your pet?");
			break;
	case 2:
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendNext("Your etc. inventory is full! I can't give you the letter unless there's room on ur inventory. Make an empty slot and then talk to me.");
			cm.dispose();
			return;
			}
			cm.gainItem(4031035, 1);
			cm.sendNext("Ok, here's the letter. He wouldn't know I sent you if you just went there straight, so go through the obstacles with your pet, go to the very top, and then talk to #p1012007# to give him the letter. It won't be hard if you pay attention to your pet while going through obstacles. Good luck!");
			cm.dispose();
}
}