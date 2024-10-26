/*
	名字:	村長塔塔曼
	地圖:	神木村
	描述:	240000000
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
		if (status < 3) {
		cm.dispose();
		return;
		}
		if (status < 4) {
		cm.sendOk("Think it over and talk to me then.");
		cm.dispose();
		return;
		}
		if (status < 5) {
		cm.sendOk("Think about it, and then let me know of your decision.");
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
		cm.sendSimple("...Can I help you? \r\n#L0##bBuy the Mahic Seed#l\r\n#L1#Do something for Leafre#l" + (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3759)).getStatus() == 1 ? "\r\n\r\n#L2#Find the ingredients for the Flying Potion (Dragon Moss Extract)#l" : "") + "");
		break;
	default:
		if (status == 1 && type == 5) select = selection;
		reactor = 'action' + select;
		eval(reactor)(mode, type, selection);
}
}

function action0(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendSimple("You don't look like you're from around here. What brings you? \r\n#L0##bI want a Magic Seed.#l");
		break;
	case 2:
		cm.sendGetNumber("#bMagic Seeds#k are precious and can't be given out for free. I'll sell you 1 #bMagic Seed#k for #b30,000 mesos#k. \r\n\r\nWould you like to purchase any? How many would you like?", 1, 1, 100);
		break;
	case 3:
		num = selection;
		cost = num * 30000;
		cm.sendYesNo("To purchase #bMagic Seed x" + num + "#k, you need to pay me #b" + cost + " mesos#k. Make the purchase?");
		break;
	case 4:
		if (cm.getPlayer().getMeso() < cost || cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendOk("Please check if you have enough mesos to purchase, or if your Etc tab has a free slot.");
			cm.dispose();
			return;
			}
			cm.sendNext("Come again soon.");
			cm.gainItem(4031346, num);
			cm.gainMeso(-cost);
			cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("It is the chief's duty to make the town more hospitable for people to live in, and carrying out the duty will require lots of items. If you have collected items around Leafre, are you interested in donating them?");
		break;
	case 2:
		chat = "Which item would you like to donate? #b";
		items = [4000226, 4000229, 4000236, 4000237, 4000260, 4000261, 4000231, 4000238, 4000239, 4000241, 4000242, 4000234, 4000232, 4000233, 4000235, 4000243];
		for (var i = 0; i < items.length; i++)
		chat += "\r\n#L" + i + "##v" + items[i] + "##t" + items[i] + "##l";
		cm.sendSimple(chat);	
		break;
	case 3:
		selectItem = selection;
		cm.sendGetNumber("How many #t" + items[selectItem] + "#'s would you like to donate? \r\n#b< Owned : " + cm.getPlayer().itemQuantity(items[selectItem]) + ">#k", 1, 1, 1000);
		break;
	case 4:
		num = selection;
		cm.sendYesNo("Are you sure you want to donate #b" + num + " #t" + items[selectItem] + "##k?");
		break;
	case 5:
		if (cm.getPlayer().itemQuantity(items[selectItem]) < num) {
			cm.sendNext("Please check and see if you have enough of the item.");
			cm.dispose();
			return;
			}
			cm.gainItem(items[selectItem], -num);
			cm.sendNext("Thank you very much.");
			cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("So, have you progressed in the investigation of the Dragon Rider?");
		break;
	case 2:
		cm.sendNextPrev("What? You met #bMatada#k? Well, well, well. I suppose he's finally returned, after having traveled the world. Not that he's ever done anything for this town, but perhaps he missed his home?");
		break;
	case 3:
		cm.sendNextPrevS("To pursue the Dragon Rider, you'll have to be able to fly. To do so, you'll need the #b#t4032531##k", 2);
		break;
	case 4:
		cm.sendNextPrev("The Dragon Moss Extract? That's an ingredient used in specialty medicine for the Halflingerers. Sure, I'll give you some if you need it, but are you sure it'll let you fly?");
		break;
	case 5:
		cm.sendNextPrevS("Yes. Matada said it's a key ingredient to make a potion for flying.", 2);
		break;
	case 6:
		cm.sendNextPrev("Oh, l see. Alright. I'll give you some. l hope you knock some sense into that Dragon Rider!");
		break;
	case 7:
		if (cm.getPlayer().itemQuantity(4032531)) {
			cm.sendOk("Looks like you've already got some Dragon Moss Extract. That should be plenty.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendOk("Go empty out a slot in the ETC tab of your Item Inventory and come back to me.");
			cm.dispose();
			return;
			}
			cm.gainItem(4032531, 1);
			cm.sendOK("Please keep looking into it, will you?");
			break;
	case 8:
		cm.dispose();
}
}