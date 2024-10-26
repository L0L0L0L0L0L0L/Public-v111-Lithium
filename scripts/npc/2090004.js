/*
	Name: Tao Yi Xian
	Map: Peach Blossom Wonderland
	Description: 250000000
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
			if (status < 5) {
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
			var chat = "I am a versatile person. Let me know what you want to do. #b";
			var options = ["Making Medicines", "Scrolls", "Donating Medicine Materials"];
			if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3821)).getStatus() == 1 && !cm.getPlayer().itemQuantity(4031554)) options.push("#p2091003# Let me get you some potions");
			for (var i = 0; i < options.length; i++)
				chat += "\r\n#L" + i + "#" + options[i] + "#l";
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection == 0) {
				var chat = "Okay, what type of medicine are you interested in? #b";
				items = [2022145, 2022146, 2022147, 2022148, 2022149, 2022150, 2050004, 4031554];
				for (var i = 0; i < items.length; i++)
					chat += "\r\n#L" + i + "##z" + items[i] + "##l";
			}
			if (selection == 1) {
				var chat = "Okay, what type of scroll are you interested in? #b";
				items = [2043000, 2043100, 2043200, 2043300, 2043700, 2043800, 2044000, 2044100, 2044200, 2044300, 2044400, 2044500, 2044600, 2044700, 2044800, 2044900];
				for (var i = 0; i < items.length; i++)
					chat += "\r\n#L" + i + "##z" + items[i] + "##l";
			}
			if (selection == 2) {
				var chat = "What medicine would you like to donate? The feedback varies according to the quantity and type of donation. #b";
				items = [4000276, 4000277, 4000278, 4000279, 4000280, 4000291, 4000292, 4000286, 4000287, 4000293, 4000294, 4000298, 4000284, 4000288, 4000285, 4000282, 4000295, 4000289, 4000296, 4000297];
				for (var i = 0; i < items.length; i++)
					chat += "\r\n#L" + i + "##z" + items[i] + "##l";
			}
			if (selection == 3) {
				cm.sendNext("Did Han Taixiu send you here? ... He is quite a diligent person, here are the potions! Don’t lose them, hehe.");
			}
			select = selection;
			cm.sendSimple(chat);
			break;
		case 2:
			selectItem = selection;
			if (select == 0) {
				var matSet = [[2022116], [2022116], [4000281, 4000293], [4000276, 2002005], [4000288, 4000292], [4000295], [2022131, 2022132], [4000286, 4000287, 4000293]];
				var matSetQty = [[3], [3], [10, 10], [20, 1], [20, 20], [10], [1, 1], [20, 20, 20]];
				var costSet = [0, 0, 910, 950, 1940, 600, 700, 1000];
			}
			if (select == 1) {
				var matSet = [[4001124, 4010001], [4001124, 4010001], [4001124, 4010001], [4001124, 4010001], [4001124, 4010001], [4001124, 4010001], [4001124, 4010001], [4001124, 4010001], [4001124, 4010001], [4001124, 4010001], [4001124, 4010001], [4001124, 4010001], [4001124, 4010001], [4001124, 4010001], [4001124, 4010001], [4001124, 4010001]];
				var matSetQty = [[100, 10], [100, 10], [100, 10], [100, 10], [100, 10], [100, 10], [100, 10], [100, 10], [100, 10], [100, 10], [100, 10], [100, 10], [100, 10], [100, 10], [100, 10], [100, 10]];
				var costSet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			}
			if (select == 2) {
				var matSet = [4000276, 4000277, 4000278, 4000279, 4000280, 4000291, 4000292, 4000286, 4000287, 4000293, 4000294, 4000298, 4000284, 4000288, 4000285, 4000282, 4000295, 4000289, 4000296, 4031435];
				var matSetQty = [7, 7, 8, 10, 11, 8, 8, 9, 8, 9, 10, 11, 11, 12, 13, 13, 14, 15, 16, 17];
				var costSet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			}
			if (select == 3) {
				if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
					cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough slots in the other items window"));
					cm.dispose();
					return;
				}
				cm.gainItem(4031554, 1);
				cm.dispose();
				return;
			}
			item = items[selectItem];
			mat = matSet[selectItem];
			matQty = matSetQty[selectItem];
			cost = costSet[selectItem];
			var chat = select == 2 ? "Do you want to donate #t" + item + "#? How many do you want to donate? The donation amount is 1:100" : "Do you want to make #t" + item + "#? How many do you want to make?";
			cm.sendGetNumber(chat, 1, 1, 100);
			break;
		case 3:
			qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);
			if (select <= 1) {
				var chat = "Do you want to make";
				chat += qty + " #t" + item + "#?";
				chat += " I need you to provide enough materials to complete it. #b";
				for (var i = 0; i < mat.length; i++)
					chat += "\r\n#v" + mat[i] + "#" + (matQty[i] * qty) + "#t" + mat[i] + "#";
				chat += "\r\n#v4031138#" + cost * qty + " mesos";
				cm.sendYesNo(chat);
			}
			if (select == 2) {
				status = 4;
				var chat = "Are you sure you want to donate #b" + 100 * qty + "#k #t " + item + "##k?";
				cm.sendYesNo(chat);
			}
			break;
		case 4:
			for (var i = 0; i < mat.length; i++)
				if (cm.getPlayer().itemQuantity(mat[i]) < matQty[i] * qty) {
					cm.sendOk("Sorry, the materials you provided do not meet the requirements for production.");
					cm.dispose();
					return;
				}
			if (cm.getPlayer().getMeso() < (cost * qty)) {
				cm.sendOk("Sorry, you don’t have enough mesos to proceed.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
				cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough slots in the use items window"));
				cm.dispose();
				return;
			}
			for (var i = 0; i < mat.length; i++)
				cm.gainItem(mat[i], -matQty[i] * qty);
			cm.gainMeso(-cost * qty);
			cm.gainItem(item, qty);
			cm.sendOk("This is a wonderful item. I hope it helps you.");
			cm.dispose();
		case 5:
			if (cm.getPlayer().itemQuantity(item) < 100 * qty) {
				cm.sendOk("Sorry, the donated #b" + item + "#k is less than #b" + 100 * qty + "#k.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
				cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough slots in the other items window"));
				cm.dispose();
				return;
			}
			cm.gainItem(item, -100 * qty);
			cm.gainItem(4001124, matQty * qty);
			cm.dispose();
	}
}
