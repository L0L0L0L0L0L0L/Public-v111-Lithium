/*
	名字:	流浪煉金術師
	地圖:	玩具城
	描述:	220000000
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
		cm.sendNext("Not enough materials, huh? No worries. Just come see me once you gather up the necessary items. There are numerous ways to obtain them, whether it be hunting or purchasing it from others, so keep going.");
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
		cm.sendNext("Let's see, tongue of mole and beak of owl in proper... Ah, blast it! I nearly forgot the binding powder. That could have been... Oh. How long have you been standing there? Speak up next time! I get very absorbed in my work.");
		break;
	case 1:
		var chat = "I am Eurek the Alchemist. There is still much for me to learn, but I am sure I can help you. What do you need? #b"
		var options = ["Make The Magic Rock", "Make The Summoning Rock"];
		for (var i = 0; i < options.length; i++)
		chat += "\r\n#L" + i + "#" + options[i] + "#l";
		cm.sendSimple(chat);
		break;
	case 2:
		if (selection == 0) {
			items = [[4000046, 4000027], [4000025, 4000049], [4000129, 4000130], [4000074, 4000057], [4000054, 4000053], [4000238, 4000241]];
			var chat = "Ha. #bThe Magic Rock#k is a mysterious rock that only I can make. Many Explorers need it when they use very powerful skills. There are six ways to make The Magic Rock. Which do you want to use? #b";
			}
		if (selection == 1) {
			items = [[4000028, 4000027], [4000014, 4000056], [4000132, 4000128], [4000074, 4000069], [4000080, 4000079], [4000226, 4000237]];
			var chat = "Ha. #bThe Summoning Rock#k is a mysterious rock that only I can make. Many Explorers need it when they use very powerful skills. There are six ways to make the The Summoning Rock. Which method do you want to use? #b";
			}
			for (var i = 0; i < items.length; i++)
			chat += "\r\n#L" + i + "#make it using #z" + items[i][0] + "# and #z" + items[i][1] + "##l";
			select = selection;
			cm.sendSimple(chat);
			break;
	case 3:
		selectItem = selection;

		if (select == 0) {
			items = [4006000, 4006000, 4006000, 4006000, 4006000];
			var matSet = [[4000046, 4000027, 4021001], [4000025, 4000049, 4021006], [4000129, 4000130, 4021002], [4000074, 4000057, 4021005], [4000054, 4000053, 4021003], [4000238, 4000241, 4021000]];
			var matSetQty = [[20, 20, 1], [20, 20, 1], [15, 15, 1], [15, 15, 1], [7, 7, 1], [15, 15, 1]];
			var costSet = [4000, 4000, 4000, 4000, 4000];
			itemid = "The Magic Rocks";
			}
		if (select == 1) {
			items = [4006001, 4006001, 4006001, 4006001, 4006001];
			var matSet = [[4000028, 4000027, 4011001], [4000014, 4000056, 4011003], [4000132, 4000128, 4011005], [4000074, 4000069, 4011002], [4000080, 4000079, 4011004], [4000226, 4000237, 4011001]];
			var matSetQty = [[20, 20, 1], [20, 20, 1], [15, 15, 1], [15, 15, 1], [7, 7, 1], [15, 15, 1]];
			var costSet = [4000, 4000, 4000, 4000, 4000];
			itemid = "The Summoning Rocks";
			}
			item = items[selectItem];
			mat = matSet[selectItem];
			matQty = matSetQty[selectItem];
			cost = costSet[selectItem];

			var chat = "To make #b5 " + itemid + "#k, I'll need the following items. Most of them can be obtained through hunting, so it won't be terribly difficult for you to get them. What do you think? Do you want some? \r\n#b";
			for (var i = 0; i < mat.length; i++)
			chat += "\r\n#v" + mat[i] + "# #t" + mat[i] + "# x " + (matQty[i]) + "";
			chat += "\r\n#v4031138#" + (cost * 1) + " Mesos";
			cm.sendYesNo(chat);
			break;
	case 4:
		for (var i = 0; i < mat.length; i++)
		if (cm.getPlayer().itemQuantity(mat[i]) < matQty[i] * 1 || cm.getPlayer().getMeso() < cost || cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendNext("Please check and see if you have all the items needed, or if your etc. inventory is full or not.");
			cm.dispose();
			return;
			}
			for (var i = 0; i < mat.length; i++)
			cm.gainItem(mat[i], -matQty[i] * 1);
			cm.gainMeso(-cost * 1);
			cm.gainItem(item, 5);
			cm.sendNext("Here, take the 5 pieces of #b" + itemid + "#k. Even l have to admit, this is a masterpiece. Alright, if you need my help down the road, by all means come back and talk to me!");
			break;
	case 5:
			cm.dispose();
}
}